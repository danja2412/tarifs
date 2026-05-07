const zoneSelect =
    document.getElementById("zone");

const transportSelect =
    document.getElementById("transport");

const result =
    document.getElementById("result");

let prices = [];

fetch("prices.xlsx")
    .then(res => res.arrayBuffer())
    .then(data => {

        const workbook =
            XLSX.read(data);

        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];

        prices =
            XLSX.utils.sheet_to_json(sheet);

        loadZones();

        loadTransports();
    });

function loadZones() {

    for (let i = 1; i <= 11; i++) {

        zoneSelect.innerHTML += `
            <option value="${i}">
                Зона ${i}
            </option>
        `;
    }
}

function loadTransports() {

    const transports = [

        "Легковий",
        "Вантажний",
        "Автобус",
        "Мотоцикл",
        "Причіп",
        "Напівпричіп",
        "Мікроавтобус",
        "Електромобіль",
        "Таксі",
        "Трактор",
        "Квадроцикл",
        "Спецтехніка",
        "Кросовер",
        "Позашляховик",
        "Пікап",
        "Фургон",
        "Евакуатор",
        "Самоскид",
        "Маніпулятор",
        "Автокран"
    ];

    transports.forEach(item => {

        transportSelect.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;
    });
}

document.addEventListener(
    "change",
    calculate
);

function calculate() {

    const type =
        document.querySelector(
            'input[name="personType"]:checked'
        )?.value;

    const zone =
        zoneSelect.value;

    const transport =
        transportSelect.value;

    if (
        !type ||
        !zone ||
        !transport
    ) {

        result.innerText =
            "Заповніть поля";

        return;
    }

    const found = prices.find(item => {

        return (
            item["Тип"] === type &&
            item["Зона"] == zone &&
            item["Транспорт"] === transport
        );
    });

    if (found) {

        result.innerText =
            `${found["Ціна"]} грн`;

    } else {

        result.innerText =
            "Ціну не знайдено";
    }
}