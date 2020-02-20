function reveal() {
    Reveal.initialize({
        hash: true,
        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/highlight/highlight.js' },
            { src: 'plugin/notes/notes.js', async: true }
        ]
    });
} 

function process(data, grade) {
    let html = '';
    let lesson = 1;
    html += '<section>';
    for (const word of data[`grade_${grade}`]) {
        if (word.lesson != lesson) {
            lesson = word.lesson;
            html += '</section><section>';
        }
        html += `<section><p>${word['pinyin'].join(' ')}</p><h1>${word['item']}</h1></section>`;
    }
    html += '</section>';
    document.getElementById('slides').innerHTML = html;
    reveal();
}

function main() {
    const root = document.getElementById('root');

    const params = new URLSearchParams(window.location.search);
    const grade = params.get('grade');

    if (grade === null) {
        document.title = '汉字学习'
        const list = document.createElement('ul');
        for (let i = 1; i < 9; i++) {
            const item = document.createElement('li');
            item.innerHTML = `<a href="index.html?grade=${i}">第${i}册</a>`
            list.append(item);
        }
        root.append(list);
    } else {
        document.title = `grade_${grade}`
        root.setAttribute('class', 'reveal');

        const slides = document.createElement('div');
        slides.setAttribute('class', 'slides');
        slides.setAttribute('id', 'slides');
        root.append(slides);

        fetch('data.json')
            .then(res => res.json())
            .then(data => process(data, grade))
            .catch((error) => console.error(error));
    }
}

main()
