import { NextResponse } from 'next/server';
import { db } from '@/lib/db/firebase-admin';

const baseUrl = process.env.NEXT_BASE_URL;

export async function GET() {
  try {
    const response = await fetch(baseUrl + 'api/mlbb/final/');
    const { data } = await response.json();

    // Create a batch write
    const batch = db.batch();

    for (const hero of data) {
      const heroId = hero.hero_id.toString();
      const heroRef = db.collection('heroes').doc(heroId);

      batch.set(
        heroRef,
        {
          ...hero,
          lastUpdated: new Date(),
        },
        { merge: false }
      ); // complete overwrite
    }

    // Commit all changes
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Heroes collection successfully updated',
    });
  } catch (error) {
    console.error('Error updating heroes collection:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update heroes collection',
    });
  }
}
