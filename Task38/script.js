const question = document.querySelectorAll(".accordion-question")
const answer = document.querySelectorAll(".accordion-answer")

question.forEach((item, index) => {
    item.addEventListener("click", () => {
        answer[index].classList.toggle("active")
        question[index].classList.remove("active")
        
    })
})