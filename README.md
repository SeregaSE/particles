## Particles

<a href="https://seregase.github.io/particles">Результать - покликать</a>

- Улучшена геометрия движения частиц
- Частицы не выходят за границы окна
- Скорость зависит от размеров окна
- Заметно снизились затраты на Painting, Rendering и Scripting. (цифры на графиках ниже)
- Поддержка большего числа частиц (до 1000 вместо 500 на слабых и до 2000 на сильных пк, на сильных и 5000 медленно с небольшими лагами но двигаются)

### Performance / fps

|                |Before                          |After                         |
|----------------|-------------------------------|-----------------------------|
|100 particles, 6x throttling |![avg fps 30 +/-5](https://github.com/SeregaSE/particles/blob/master/tests/before_100_x6_throttling.png) |![avg fps 60 /-10](https://github.com/SeregaSE/particles/blob/master/tests/after_100_x6_throttling.png) |
|500 particles, 6x throttling |![avg fps 30 +/-5](https://github.com/SeregaSE/particles/blob/master/tests/before_500_x6_throttling.png) |![avg fps 40 /-5](https://github.com/SeregaSE/particles/blob/master/tests/after_500_x6_throttling.png) |
|1000 particles, 6x throttling | |![avg fps 20 /-5](https://github.com/SeregaSE/particles/blob/master/tests/after_1000_x6_throttling.png) |
|1000 particles |![avg fps 15 +/-5](https://github.com/SeregaSE/particles/blob/master/tests/before_1000.png) |![avg fps 35 /-10](https://github.com/SeregaSE/particles/blob/master/tests/after_1000.png) |
|2000 particles |![avg fps 15 +/-10](https://github.com/SeregaSE/particles/blob/master/tests/before_2000.png) |![avg fps 30 /-5](https://github.com/SeregaSE/particles/blob/master/tests/after_2000.png) |
