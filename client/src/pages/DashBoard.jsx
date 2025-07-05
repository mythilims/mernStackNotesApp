import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getToken, userId } from "../utils/common";

function DashBoard() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getNoteDayWise() {
      const data = await fetch(
        `http://localhost:3000/notes/days?userId=${userId()}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const result = await data.json();
      const counts = result.data.map((item) => item.count);
      const names = result.data.map((item) => item.category);

      setSeries([{ name: "Notes", data: counts }]);
      setCategories(names);
    }
    getNoteDayWise();
  }, []);
  return (
    <>
      <p className="font-bold text-xl p-2 m-2 underline ">Notes analysis </p>
      <div className="grid grid-rows-1 sm:grid-cols-3 gap-2 rounded ">
        <div className="shadow-lg bg-white-200 border border-sky-200 hover:bg-gray-100">
          <ReactApexChart
            options={{
              chart: {
                id: "notes-bar",
                toolbar: { show: false },
              },
              xaxis: {
                categories,
              },
              colors: ["#0ea5e9"],
            }}
            series={series}
            type="bar"
            height={320}
          />
        </div>
      </div>
    </>
  );
}

export default DashBoard;
