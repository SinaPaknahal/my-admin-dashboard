import { useState } from "react";
import { IranMap } from "react-iran-map";

const mapData = [
  { id: "tehran", value: 42 },
  { id: "isfahan", value: 28 },
  { id: "fars", value: 31 },
  { id: "khorasan-razavi", value: 19 },
  { id: "mazandaran", value: 15 },
  { id: "gilan", value: 17 },
  { id: "khuzestan", value: 22 },
  { id: "azarbaijan-sharghi", value: 14 },
  { id: "kerman", value: 11 },
  { id: "yazd", value: 9 },
];

export default function IranMapWithStats() {
  const [selected, setSelected] = useState("tehran");
  const [tooltip, setTooltip] = useState({ show: false, name: "", value: 0, x: 0, y: 0 });

  const handleSelectProvince = (province) => {
    setSelected(province);
  };

  const handleMouseEnter = (e, province) => {
    const provinceData = mapData.find((p) => p.id === province) || { value: 0 };
    setTooltip({
      show: true,
      name: province,
      value: provinceData.value,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, name: "", value: 0, x: 0, y: 0 });
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        آمار نمایندگی‌ها در استان‌ها
      </h3>

      <div className="relative">
        <IranMap
          data={mapData}
          colorRange="255,255,255" // داخل استان سفید
          textColor="#000"
          width={650}
          defaultSelectedProvince={selected}
          selectedProvinceColor="#22c55e" // سبز ملایم
          deactiveProvinceColor="#ffffff"
          tooltipTitle="نمایندگی‌ها:"
          selectProvinceHandler={handleSelectProvince}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip.show && (
          <div
            className="absolute bg-gray-900 text-white text-xs px-3 py-1 rounded-lg pointer-events-none"
            style={{
              left: tooltip.x - 70,
              top: tooltip.y - 90,
              transition: "opacity 0.2s",
            }}
          >
            <span>{tooltip.name}</span> -{" "}
            <span className="font-bold">{tooltip.value} نمایندگی</span>
          </div>
        )}
      </div>
    </div>
  );
}
