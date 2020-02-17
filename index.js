function process(data, grade) {
    let html = "";
    let lesson = 1;
    html += "<section>";
    for (const word of data[grade]) {
        if (word.lesson != lesson) {
            lesson = word.lesson;
            html += "</section><section>";
        }
        html += `<section><h1>${word["item"]}</h1></section>`;
    }
    html += "</section>";
    document.getElementById("slides").innerHTML = html;
}

function addSlides(grade) {
    document.title = grade
    fetch('data.json')
      .then(res => res.json())
      .then(data => process(data, grade))
      .catch((error) => console.error(error));
}
