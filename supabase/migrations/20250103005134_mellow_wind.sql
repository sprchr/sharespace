/*
  # Initial Schema Setup for Community Share Application

  1. New Tables
    - `profiles`
      - Extends Supabase auth with user profile information
    - `communities`
      - Stores community information
    - `community_members`
      - Tracks community membership
    - `items`
      - Stores shared items information
    - `item_requests`
      - Tracks item borrowing requests

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create communities table
CREATE TABLE communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_private boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create community members table
CREATE TABLE community_members (
  community_id uuid REFERENCES communities(id),
  user_id uuid REFERENCES profiles(id),
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (community_id, user_id)
);

-- Create items table
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  price_per_day decimal(10,2),
  is_free boolean DEFAULT false,
  owner_id uuid REFERENCES profiles(id),
  community_id uuid REFERENCES communities(id),
  status text DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create item requests table
CREATE TABLE item_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id),
  requester_id uuid REFERENCES profiles(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Communities policies
CREATE POLICY "Public communities are viewable by everyone"
  ON communities FOR SELECT
  USING (NOT is_private OR EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = communities.id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Members can view private communities"
  ON communities FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = communities.id
    AND user_id = auth.uid()
  ));

-- Community members policies
CREATE POLICY "Community members are viewable by other members"
  ON community_members FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM community_members cm
    WHERE cm.community_id = community_members.community_id
    AND cm.user_id = auth.uid()
  ));

-- Items policies
CREATE POLICY "Items are viewable by community members"
  ON items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = items.community_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create items in their communities"
  ON items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = items.community_id
    AND user_id = auth.uid()
  ));

-- Item requests policies
CREATE POLICY "Users can view their own requests"
  ON item_requests FOR SELECT
  USING (requester_id = auth.uid() OR EXISTS (
    SELECT 1 FROM items
    WHERE items.id = item_requests.item_id
    AND items.owner_id = auth.uid()
  ));