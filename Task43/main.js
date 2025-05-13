let allProducts = [];
let currentPage = 1;
const productsPerPage = 6;

async function fetchProducts(url = "https://dummyjson.com/products") {
  const res = await fetch(url);
  const data = await res.json();
  allProducts = data.products;
  currentPage = 1;
  renderProducts();
  updatePageNumber();
}

function renderProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const visibleProducts = allProducts.slice(start, end);

  const container = document.getElementById("products");
  container.innerHTML = "";
  visibleProducts.forEach((p) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.description.slice(0, 50)}...</p>
        <p><strong>${p.price}$</strong></p>
        <button onclick="viewDetail(${p.id})">Xem chi tiết</button>
      </div>
    `;
  });

  document.getElementById(
    "productCount"
  ).innerText = `Đang xem ${visibleProducts.length} / ${allProducts.length} sản phẩm`;
}

function handleSearch() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    fetchProducts();
    return;
  }
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.products;
      currentPage = 1;
      renderProducts();
      updatePageNumber();
    });
}

function handleSort(order) {
  if (order === "asc") {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    allProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts();
}

function viewDetail(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((p) => {
      document.getElementById("productDetail").innerHTML = `
        <h2>${p.title}</h2>
        <img src="${p.thumbnail}" width="300"><br>
        <p><strong>Giá:</strong> ${p.price}$</p>
        <p><strong>Mô tả:</strong> ${p.description}</p>
        <p><strong>Brand:</strong> ${p.brand}</p>
        <button onclick="closeDetail()">Đóng</button>
      `;
    });
}

function closeDetail() {
  document.getElementById("productDetail").innerHTML = "";
}

function updatePageNumber() {
  document.getElementById("current-page").innerText = currentPage;
}

document.getElementById("preview").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
    updatePageNumber();
  }
});

document.getElementById("next").addEventListener("click", function () {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
    updatePageNumber();
  }
});

fetchProducts();
