const validarFormulario = () => {
  // obtener los valores
  let email = document.getElementById("inputEmail").value;
  let name = document.getElementById("inputName").value;
  let phone = document.getElementById("inputPhone").value;
  let address = document.getElementById("inputAddress").value; // nueva línea para obtener la dirección

  // validar
  if (email == "") {
    alert("El correo es obligatorio");
    return false;
  } else if (!email.includes("@")) {
    alert("Correo Inválido");
    return false;
  }
  if (name == "") {
    alert("El nombre es obligatorio");
    return false;
  }
  if (phone == "") {
    alert("El teléfono es obligatorio");
    return false;
  }
  if (address == "") {
    alert("Direccion es obligatorio");
    return false;
  }
  // Si pasa todo
  return true;
};

const addData = () => {
  if (validarFormulario() == true) {
    // obtener los valores
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let phone = document.getElementById("inputPhone").value;
    let address = document.getElementById("inputAddress").value; // nueva línea para obtener la dirección

    let listPeople;
    if (localStorage.getItem("listPeople") == null) {
      listPeople = [];
    } else {
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }
    listPeople.push({
      email: email,
      name: name,
      phone: phone,
      address: address, // añadir la dirección al objeto
    });
    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    showData();
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputAddress").value = ""; // limpiar también la dirección
  }
};

const showData = () => {
  let listPeople;

  if (localStorage.getItem("listPeople") === null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  let html = "";

  listPeople.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html += "<td>" + element.address + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Eliminar dato</button> <button onclick="updateData(' +
      index +
      ')" class="btn btn-warning">Editar dato</button></td>';
    html += "</tr>";
  });

  document.querySelector("#tableData tbody").innerHTML = html;
};
document.onload = showData();

const updateData = (index) => {
  // Cambiar visibilidad
  document.getElementById("btnAdd").style.display = "none"; // esconder agregar
  document.getElementById("btnUpdate").style.display = "block";

  let listPeople;
  if (localStorage.getItem("listPeople") == null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  // rellenar los campos
  document.getElementById("inputEmail").value = listPeople[index].email;
  document.getElementById("inputName").value = listPeople[index].name;
  document.getElementById("inputPhone").value = listPeople[index].phone;
  document.getElementById("inputAddress").value = listPeople[index].address; // rellenar dirección

  // Actualizar datos
  document.querySelector("#btnUpdate").onclick = function () {
    if (validarFormulario() == true) {
      listPeople[index].email = document.getElementById("inputEmail").value;
      listPeople[index].name = document.getElementById("inputName").value;
      listPeople[index].phone = document.getElementById("inputPhone").value;
      listPeople[index].address = document.getElementById("inputAddress").value; // actualizar dirección

      // guardar lista actualizada
      localStorage.setItem("listPeople", JSON.stringify(listPeople));

      // mostrar la data
      showData();

      document.getElementById("inputEmail").value = "";
      document.getElementById("inputName").value = "";
      document.getElementById("inputPhone").value = "";
      document.getElementById("inputAddress").value = ""; // limpiar dirección

      // cambiar la visibilidad de los botones
      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
    }
  };
};

const deleteData = (index) => {
  let listPeople;
  if (localStorage.getItem("listPeople") == null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }
  listPeople.splice(index, 1);
  localStorage.setItem("listPeople", JSON.stringify(listPeople));
  showData();
};
