document.addEventListener("DOMContentLoaded", function () {

  const cityHeaders = document.querySelectorAll(".city-header");

  cityHeaders.forEach(header => {
    header.addEventListener("click", function () {

      const content = this.nextElementSibling;
      const isOpen = content.style.maxHeight;

      // zatvori sve
      document.querySelectorAll(".city-content").forEach(el => {
        el.style.maxHeight = null;
        el.parentElement.classList.remove("active");
      });

      // ako nije bio otvoren, otvori ga
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        this.parentElement.classList.add("active");
      }

    });
  });

  function animateCounter(element, target, duration = 3000) {
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(animation);
  }

  const section = document.querySelector("#global-presence");
  const counters = document.querySelectorAll(".counter");

  if (section) {
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            animateCounter(counter, target);
          });
        }
      });
    }, { threshold: 0.4 });

    observer.observe(section);
  }

});

