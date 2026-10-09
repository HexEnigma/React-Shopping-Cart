function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <nav className="filters" aria-label="Product categories">
      {categories.map((category) => (
        <button
          key={category}
          className={`filters__btn ${selected === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  )
}

export default CategoryFilter