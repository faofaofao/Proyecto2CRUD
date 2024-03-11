const validarFormulario = () => {
  // obtener los valores
  const email = document.getElementById("inputEmail").value;
  const name = document.getElementById("inputName").value;
  const phone = document.getElementById("inputPhone").value;
  const address = document.getElementById("inputAddress").value;

  // validar
  if (email === "") {
    alert("El correo es obligatorio");
    return false;
  } else if (!email.includes("@")) {
    alert("Correo Inválido");
    return false;
  }
  if (name === "") {
    alert("El nombre es obligatorio");
    return false;
  }
  if (phone === "") {
    alert("El teléfono es obligatorio");
    return false;
  }
  if (address === "") {
    alert("Dirección es obligatoria");
    return false;
  }

  return true;
};
//Agregar valores
const addData = () => {
  if (validarFormulario()) {
    const email = document.getElementById("inputEmail").value;
    const name = document.getElementById("inputName").value;
    const phone = document.getElementById("inputPhone").value;
    const address = document.getElementById("inputAddress").value;

    const listPeople = localStorage.getItem("listPeople")
      ? JSON.parse(localStorage.getItem("listPeople"))
      : [];
    listPeople.push({ email, name, phone, address });
    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    showData();
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputAddress").value = "";
  }
};
//Mostrar valores
const showData = () => {
  const listPeople = localStorage.getItem("listPeople")
    ? JSON.parse(localStorage.getItem("listPeople"))
    : [];
  const html = listPeople
    .map((element, index) => {
      return `
      <tr>
        <td>${element.email}</td>
        <td>${element.name}</td>
        <td>${element.phone}</td>
        <td>${element.address}</td>
        <td>
          <button onclick="deleteData(${index})" class="btn btn-danger">Eliminar dato</button>
          <button onclick="updateData(${index})" class="btn btn-warning">Editar dato</button>
        </td>
      </tr>`;
    })
    .join("");
  document.querySelector("#tableData tbody").innerHTML = html;
};

document.addEventListener("DOMContentLoaded", showData);

//Actualizar valores
const updateData = (index) => {
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";

  const listPeople = localStorage.getItem("listPeople")
    ? JSON.parse(localStorage.getItem("listPeople"))
    : [];

  document.getElementById("inputEmail").value = listPeople[index].email;
  document.getElementById("inputName").value = listPeople[index].name;
  document.getElementById("inputPhone").value = listPeople[index].phone;
  document.getElementById("inputAddress").value = listPeople[index].address;

  document.querySelector("#btnUpdate").onclick = () => {
    if (validarFormulario()) {
      listPeople[index].email = document.getElementById("inputEmail").value;
      listPeople[index].name = document.getElementById("inputName").value;
      listPeople[index].phone = document.getElementById("inputPhone").value;
      listPeople[index].address = document.getElementById("inputAddress").value;

      localStorage.setItem("listPeople", JSON.stringify(listPeople));

      showData();

      document.getElementById("inputEmail").value = "";
      document.getElementById("inputName").value = "";
      document.getElementById("inputPhone").value = "";
      document.getElementById("inputAddress").value = "";

      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
    }
  };
};

const deleteData = (index) => {
  const listPeople = localStorage.getItem("listPeople")
    ? JSON.parse(localStorage.getItem("listPeople"))
    : [];
  listPeople.splice(index, 1);
  localStorage.setItem("listPeople", JSON.stringify(listPeople));
  showData();
};
