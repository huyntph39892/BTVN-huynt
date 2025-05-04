function addItem(){
    const list = document.getElementById("list")
    const newItems = document.createElement("div")
    newItems.className = "item"
    newItems.textContent = `phan tu ${list.children.length+1}`
    list.append(newItems)
}
function removeItem(){
    const list = document.getElementById("list")
    if(list.children.length>0){
        list.removeChild(list.lastChild)
    }
    else{
        alert("ko con gi de xoa")
    }
    
}