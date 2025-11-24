async function Display_all_med() {
    const response = await fetch("http://127.0.0.1:8000/medicines");
    const meds = await response.json();
    console.log("Fetched data:", meds);

    const med_list = meds.medicines;
    const list = document.getElementById("display");
    list.innerHTML= '<button type="button" onclick="hide_gear()">DONE</button>';
    list.style.display = "block";

    for(let i = 0; i < med_list.length; i++){
        let med = med_list[i];
        
        if (med.name === "" || med === null){
            med.name = "empty string";
            console.log(med);
            list.innerHTML += `<ul><li>${med.name} - ${med.price}</li></ul>`;
        }
        else{
        console.log(med);
        list.innerHTML += `<ul><li>${med.name} - ${med.price}</li></ul>`;
        };
    };
}

function hide_med(){
    document.getElementById("display").style.display = "none";
}

//change gearname
async function Search_for_medicine() {
    let search = document.getElementById('MedName').value.trim();
    console.log(search);

    if (!search) { 
        search = "empty string";
        alert("Input A Name");
    };

    const response = await fetch(`http://127.0.0.1:8000/medicines/${search}`);
    const med = await response.json();

    const display = document.getElementById("search");
    display.innerHTML = med.message;

    console.log(med);
}

async function get_average() {

    const response = await fetch("http://127.0.0.1:8000/average");
    const med = await response.json();

    const display = document.getElementById("average");
    display.innerHTML= `Average : ${med.message}
    <button type="button" onclick="hide_average()"> DONE</button>`; 

    document.getElementById("average_").style.display = "block"
}

function hide_average(){
    document.getElementById("average_").style.display = "none";
}


async function delete_Med(){
    const name = document.getElementById("delete_name");
    const formData = new FormData(name)
    const medName = formData.get('name').trim()

    const med_response = await fetch(`http://127.0.0.1:8000/medicines/${formData.get("name")}`);
    const search = await med_response.json();

    if (!search.error){
        const check = confirm(`Are you sure you want to delete "${medName}" `);
        if (check){
            console.log("Deleting:", FormData);
            
            const response = await fetch(`http://127.0.0.1:8000/delete`, {
            method: "DELETE" , body: formData });
            const data = await response.json();
            console.log(data);

            const display = document.getElementById("result");
            display.innerText = data.message;
            document.getElementById("delete_name").style.display = "none"
        }
        else{
            return;
    }}
    else{
        alert(`${search.error}`);
        document.getElementById("delete_name").style.display = "none";
    }
}


function show_delete_button(){
    document.getElementById('delete_name').style.display = "block";
}



//
function open_add_Med(){
    document.getElementById("add_popup").style.display = "block";

}
function close_add_Med(){
    document.getElementById("add_popup").style.display = "none";
    document.getElementById("add_display").style.display = "none";
}

async function Add_Medicine(){
    const form = document.getElementById("add_form");
    const formData = new FormData(form);
    console.log(formData.get("name"));

    const med_response = await fetch(`http://127.0.0.1:8000/medicines/${formData.get("name")}`);
    const search = await med_response.json();

    if (formData.get('name') && formData.get("price") != "" || null){
        if (search.error){
            console.log(search.error)
                const response = await fetch("http://127.0.0.1:8000/create",{
                method : "POST",
                body : formData
                });

                const data = await response.json();
                const display = document.getElementById("add_display");
                console.log(display);
                display.innerHTML = data.message;
            }
        else{
            alert(`${formData.get("name")} already exist`);
            };
        }
        else{
            alert("Fill both inputs");
        }

 }

//this is the update section
function open_update(){
    document.getElementById("update_popup").style.display = "block";
 
}

function close_update(){
    document.getElementById("update_popup").style.display = "none";
    document.getElementById('result').style.display = "none";
}

async function update_Med() {
    const form = document.getElementById("update_form");
    const formData = new FormData(form);

    const med_response = await fetch(`http://127.0.0.1:8000/medicines/${formData.get("name")}`);
    const search = await med_response.json();
    console.log(search.error);

    if (!search.error){
        
    if (formData.get('name') && formData.get("quantity") != "" || null){
        const response = await fetch("http://127.0.0.1:8000/update", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        const display = document.getElementById("update_display");
        display.innerText = data.message;
        console.log(`${formData.get("name")} i exist `)
        }
        else{
            alert("Fill both input");
            console.log(`${formData.get("name")} dont exist`)
        };
    } 
    else{
        alert(`${formData.get("name")} does not exist`)
        
    };

}
