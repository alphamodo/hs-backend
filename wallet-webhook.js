require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

app.post('/webhook', async (req, res) => {
  const { user_id, amount } = req.body;

  const { data, error } = await supabase.rpc('increment_wallet_balance', {
    user_id,
    amount
  });

  if (error) {
    console.error('Error updating wallet:', error);
    return res.status(500).json({ error: 'Failed to update wallet' });
  }

  return res.status(200).json({ success: true });
});

app.listen(3001, () => console.log('🔌 Wallet webhook listening on port 3001'));
