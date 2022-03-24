
const SearchButton = document.getElementById("searchButton");
const inputArea = document.getElementById("input-area");
// Load Api With EventListener 
SearchButton.addEventListener("click",function(){
    // spinner on 
    toggleSpenner("block");
    const inputTag = document.getElementById("searchText");
    const inputText = inputTag.value;
    const inputValue = inputText.toLowerCase();
    if (inputValue === "") {
        inputArea.style.border = "1px solid red";
        toggleSpenner("none");
    }else{
        
    inputArea.style.border = "1px solid #ced4da";

    }
    inputTag.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data));

    
});
// spinner function 
const toggleSpenner = displayStyle =>{
    document.getElementById("cover-spin").style.display = displayStyle;
}

// search Phone Result 
const displayData = data =>{
    
    const row = document.getElementById("allPhone");
    row.textContent = "";
    data.forEach(phone => {
    //    console.log(phone);
            const div = document.createElement("div");
            const divClasses = ["col-md-4", "col-sm-12", "mt-5"]
            div.classList.add(...divClasses);
                if (row.childElementCount < 20) {
                    const showMore = document.getElementById("show-more-button");
                    showMore.style.display = "block";
                    
                    div.innerHTML = `
                        <div class="card shadow-sm ">
                            <img class="mx-auto my-0 pt-2" src="${phone.image}" width="216" height="256" alt="" />
                            <div class="card-body">
                                <h3 class="card-title">${phone.phone_name}</h3>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" >View Details</button>
                                        
                                    </div>
                                    <small class="text-muted">Brand: ${phone.brand}</small>
                                </div>
                            </div>
                        </div>
                    `;
                    row.appendChild(div);
                    // spinner off 
                    toggleSpenner("none");
        }else if(row.childElementCount == ""){
            console.log("not found");
             
        }
    });
    

}

// load data from id 
const phoneDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetailsInModal(data.data));
 }
//  show data with modal 
 const showDetailsInModal = data =>{
    console.log(data);
    
// show sensors value 
const getSensor = allSensor => {
    let sensorData = "";  
     allSensor.forEach(sensor  => {
         sensorData = sensorData +", "+ sensor;
         
     });
     return sensorData.substring(2);
 
 }
const sensor = getSensor(data.mainFeatures.sensors);

// show others value 
const othersProp = data =>{
    let otherHtml = "";
    for (const key in data) {
      otherHtml += `
      <tr>
        <td width="100"><h6> ${key}</h6></td>
        <td>${data[key]}</td>
    </tr>
      `;
    }
    return otherHtml;
}
const otherData = othersProp (data.others);

// create modal design with js 

     const modalContainer = document.getElementById("my-modal");
     modalContainer.textContent = "";
     const modalRow = document.createElement("div");
     modalRow.classList.add("modal-content");
     modalRow.innerHTML = `
                <div class="modal-header">
                <div class="modal-title " id="exampleModalLabel" >
                <h5>${data.name}</h5>
                <h6>${data.releaseDate}</h6>
                </div> 
                
                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="ModalBody" class="modal-body">
                    <div class="image text-center">
                    <img
                    class=" pt-2"
                    src="${data.image}"
                    width="216"
                    height="256"
                    alt=""
                    />
                    </div>
                    <div class="card-body">
                            <h6 class="card-text">${data.name} Full Specifications</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td width="100"><h6>Brand</h6></td>
                                            <td>${data.brand}</td>
                                        </tr>

                                        <tr>
                                            <td><h6>Name</h6></td>
                                            <td>${data.name}</td>
                                        </tr>

                                        <tr>
                                            <td><h6>ChipSet</h6></td>
                                            <td>${data.mainFeatures.chipSet}</td>
                                        </tr>

                                        <tr>
                                            <td> <h6>Display Size</h6> </td>
                                            <td>${data.mainFeatures.displaySize}</td>
                                        </tr>

                                        <tr>
                                            <td><h6>Memory</h6> </td>
                                            <td>${data.mainFeatures.memory}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <table class="table table-striped">
                                    <tbody>
                                        ${otherData}
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                    <table class="table table-striped">
                                    
                                        <tbody>
                                                <td width="100"> <h6>Sensor</h6></td>
                                                <td>${sensor}</td>
                                            </tr>
                                        </tbody>
                                </table>
                            </div>
                        </div>
                </div>
     `;
     modalContainer.appendChild(modalRow);
 }