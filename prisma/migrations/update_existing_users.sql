-- Update all existing users to have the new fields
-- This ensures users created before the schema update work properly

UPDATE User 
SET 
  hasFullAccess = 0,
  plan = 'NONE'
WHERE hasFullAccess IS NULL;
