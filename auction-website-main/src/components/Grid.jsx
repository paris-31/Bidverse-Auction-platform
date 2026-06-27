import React, { useContext, useMemo, useState } from "react";
import { Item } from "./Item";
import { ItemsContext } from "../contexts/ItemsContext";

const Grid = () => {

  const { items } = useContext(ItemsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(items.map((item) => item.category))
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {

      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const groupedItems = filteredItems.reduce((groups, item) => {

    const category = item.category || "Featured Collection";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(item);

    return groups;

  }, {});

  return (
    <div id="auction-collections" className="auction-sections">

      {/* SEARCH + FILTER */}

      <div className="search-filter-bar">

        <input
          type="text"
          placeholder="Search luxury items..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >

          {categories.map((category) => (
            <option key={category}>
              {category}
            </option>
          ))}

        </select>

      </div>

      {/* COLLECTIONS */}

      {Object.entries(groupedItems).map(([category, categoryItems]) => (

        <section key={category} className="category-section">

          <div className="section-header">

            <h2 className="category-title">
              {category}
            </h2>

            <div className="section-line"></div>

          </div>

          <div className="horizontal-scroll">

            {categoryItems.map((item) => (
              <div className="scroll-card" key={item.id}>
                <Item item={item} />
              </div>
            ))}

          </div>

        </section>

      ))}

    </div>
  );
};

export default Grid;
