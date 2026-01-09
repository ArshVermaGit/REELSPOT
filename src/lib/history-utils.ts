export const saveToHistory = async (data: {
  title: string;
  platform: string;
  url: string;
  thumbnail?: string;
}) => {
  try {
    const res = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return false;
  }
};
