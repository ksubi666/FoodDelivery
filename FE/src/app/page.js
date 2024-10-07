'use client';
import CategoryFeature from '@/components/CategoryFeature';
import Feature from '@/components/Feature';
import HomePageMain from '@/components/HomePageMain';
import Loading from '@/components/Loading';
import { useFoodsAndCategories } from '@/hooks/useFoodsAndCategories';

export default function Home() {
  const { response, loading, error } = useFoodsAndCategories();

  return (
    <main>
      <HomePageMain />
      <Feature />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-20 pb-20">
          {response &&
            response.map(
              (el, i) =>
                el.foods.length !== 0 && (
                  <CategoryFeature
                    categoryName={el.name}
                    data={el.foods}
                    href={i}
                  />
                )
            )}
        </div>
      )}
    </main>
  );
}
