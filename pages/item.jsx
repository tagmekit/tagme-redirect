import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ItemPage() {
  const router = useRouter();
  const { item_id } = router.query;

  useEffect(() => {
    if (!item_id) return;

    const checkRegistration = async () => {
      try {
        const res = await fetch(`/api/fetch-registered?item_id=${item_id}`);
        const data = await res.json();
        const isRegistered = data.records && data.records.length > 0;

        const redirectUrl = isRegistered
          ? `https://tally.so/r/wzRyXk?item_id=${item_id}`
          : `https://tally.so/r/mKZ2zD?item_id=${item_id}`;

        window.location.href = redirectUrl;
      } catch (err) {
        console.error('Error fetching from API:', err);
      }
    };

    checkRegistration();
  }, [item_id]);

  return <p>Redirecting, please wait...</p>;
}
