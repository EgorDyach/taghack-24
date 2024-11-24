import { AddOfficeBlock } from "@/components/shared/AddOfficeBlock";
import OfficeCard from "@/components/shared/OfficeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/title";
import { getOffices } from "@/services/OfficesOperations/OfficesOperations";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const MainPage = () => {
  const [offices, setOffices] = useState<Office[] | null>(null);

  const updateData = useCallback(async () => {
    getOffices().then((data) => data && setOffices(data));
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <div>
      <div className="w-full flex items-center justify-between max-sm:block">
        <Title size="md" text="Главная" />
        {offices?.length && (
          <div className="w-2/5 flex items-center gap-4 max-lg:w-3/5 max-sm:w-full max-sm:mt-4">
            <Input />
            {localStorage.getItem("role") === "admit" ? (
              <AddOfficeBlock updateData={updateData} />
            ) : (
              <Button disabled>
                <Plus />
                Добавить оффис
              </Button>
            )}
          </div>
        )}
      </div>

      {offices?.length ? (
        <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices?.map((item) => (
            <OfficeCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center flex-col gap-8 mt-40">
          <Title size="md" text={"У вас нет офисов"} />
          <AddOfficeBlock updateData={updateData} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
