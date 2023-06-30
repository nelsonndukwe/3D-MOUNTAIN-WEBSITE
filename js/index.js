const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main")

let xValue = 0;
let yValue = 0;
let rotateDeg = 0;

const update = (cursorPosition) => {
  parallax_el.forEach((item) => {
    let xSpeed = item.dataset.speedx;
    let ySpeed = item.dataset.speedy;
    let rotateSpeed = item.dataset.rotate;

    let zValue = cursorPosition - parseFloat(getComputedStyle(item).left);

    item.style.transform = `translateX(calc(-50% + ${
      -xValue * xSpeed
    }px)) translateY(calc(-50% + ${yValue * ySpeed}px)) 
     translateZ(${zValue}px)
        rotateY(${rotateDeg * rotateSpeed}deg)`;
  });
};

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDeg = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

if(window.innerWidth >= 725){
  main.style.maxHeight = `${window.innerWidth * 0.6}px`
}else{
  main.style.maxHeight = `${window.innerWidth * 1.6}px`
}






// GSAP ANIMATION //

let timeline = gsap.timeline();

parallax_el
  // .filter((el) => !el.classslist.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        opacity: 0,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });
timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
