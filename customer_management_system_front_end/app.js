// loadCutomer();

// function loadCutomer() {
//   fetch("http://localhost:8080/customer/get-all")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }

const URL = "http://localhost:8080/customer";

// Fetch all customers and display them
async function fetchCustomers() {
  try {
    const response = await fetch(`${URL}/get-all`);
    const customers = await response.json();
    displayCustomers(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

// Display customers in the table
function displayCustomers(customers) {
  const tbody = document.getElementById("customerTableBody");
  tbody.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
            <td class="actions">
                <button class="btn btn-warning btn-sm" onclick="editCustomer(${customer.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Add a new customer
document
  .getElementById("addCustomerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const customer = {
      name: document.getElementById("addName").value,
      address: document.getElementById("addAddress").value,
      salary: parseFloat(document.getElementById("addSalary").value),
    };

    try {
      await fetch(`${URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      alert("Customer added successfully!");
      fetchCustomers(); // Refresh the table
      document.getElementById("addCustomerForm").reset(); // Clear the form
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  });

// Delete a customer
async function deleteCustomer(id) {
  if (confirm("Are you sure you want to delete this customer?")) {
    try {
      await fetch(`${URL}/delete/${id}`, { method: "DELETE" });
      alert("Customer deleted successfully!");
      fetchCustomers(); // Refresh the table
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }
}

// Search customers by ID, name, or address
document
  .getElementById("searchCustomerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchQuery").value;

    try {
      let response;
      if (!isNaN(query)) {
        response = await fetch(`${URL}/search-by-id/${query}`);
        const customer = await response.json();
        displayCustomers([customer]); // Display single customer
      } else {
        response = await fetch(`${URL}/search-by-name/${query}`);
        const customers = await response.json();
        displayCustomers(customers);
      }
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  });

// Edit a customer (populate update form with customer data)
async function editCustomer(id) {
  const response = await fetch(`${URL}/search-by-id/${id}`);
  const customer = await response.json();

  // Populate the update form
  document.getElementById("updateId").value = customer.id;
  document.getElementById("updateName").value = customer.name;
  document.getElementById("updateAddress").value = customer.address;
  document.getElementById("updateSalary").value = customer.salary;

  // Show the update form and hide the add form
  document.getElementById("updateCustomerSection").style.display = "block";
  document.getElementById("addCustomerForm").style.display = "none";
}

// Update a customer
document
  .getElementById("updateCustomerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const customer = {
      id: parseInt(document.getElementById("updateId").value),
      name: document.getElementById("updateName").value,
      address: document.getElementById("updateAddress").value,
      salary: parseFloat(document.getElementById("updateSalary").value),
    };

    try {
      await fetch(`${URL}/Update-customer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      alert("Customer updated successfully!");
      fetchCustomers(); // Refresh the table
      cancelUpdate(); // Hide the update form and show the add form
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  });

// Cancel update and show the add form
function cancelUpdate() {
  document.getElementById("updateCustomerSection").style.display = "none";
  document.getElementById("addCustomerForm").style.display = "flex";
  document.getElementById("updateCustomerForm").reset(); // Clear the update form
}

// Initial fetch to load customers
fetchCustomers();
