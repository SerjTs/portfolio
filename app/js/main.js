$(function() {

  // часики
  const deg = 6;
  const hr = document.querySelector('#hr');
  const mn = document.querySelector('#mn');
  const sc = document.querySelector('#sc');
  setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
  });

  $('.works__slider').slick({
    prevArrow: '<button type="button" class="slick-prev"><svg width="46" height="78" viewBox="0 0 46 78" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33203 42.0436L36.043 76.7539C36.8458 77.5574 37.9175 78 39.0603 78C40.203 78 41.2747 77.5574 42.0775 76.7539L44.6337 74.1983C46.2971 72.5331 46.2971 69.8266 44.6337 68.1638L15.4861 39.0162L44.6661 9.83617C45.4689 9.03271 45.9122 7.96164 45.9122 6.81955C45.9122 5.67619 45.4689 4.60513 44.6661 3.80104L42.1098 1.24609C41.3064 0.442627 40.2353 0 39.0926 0C37.9499 0 36.8782 0.442627 36.0754 1.24609L1.33203 35.9881C0.527308 36.7941 0.0853138 37.8703 0.0878506 39.0143C0.0853138 40.1627 0.527308 41.2382 1.33203 42.0436Z" fill="white"/></svg></>',
    nextArrow: '<button type="button" class="slick-next"><svg width="46" height="78" viewBox="0 0 46 78" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.668 35.9564L9.95703 1.24609C9.15421 0.442631 8.08251 0 6.93979 0C5.79706 0 4.72537 0.442631 3.92254 1.24609L1.36632 3.80168C-0.297033 5.46693 -0.297033 8.17345 1.36632 9.83616L30.514 38.9838L1.33398 68.1638C0.531155 68.9673 0.0878906 70.0384 0.0878906 71.1805C0.0878906 72.3238 0.531155 73.3949 1.33398 74.199L3.8902 76.7539C4.69366 77.5574 5.76472 78 6.90745 78C8.05017 78 9.12187 77.5574 9.92469 76.7539L44.668 42.0119C45.4727 41.2059 45.9147 40.1297 45.9122 38.9857C45.9147 37.8373 45.4727 36.7618 44.668 35.9564Z" fill="white"/></svg></button>',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    speed: 300,
    arrows: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 501,
        settings: {
          arrows: false,
          slidesToShow: 1,
        }
      },
    ]
  });

  $('.feedbacks__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    speed: 300,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  $('.header__menu-btn').on('click', function () {
    $('.header__menu-btn').toggleClass('header__menu-btn--active');
    $('.header__menu-list').toggleClass('header__menu-list--active');
  });

  // smooth scroll
  $(".header__menu-link").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 700);
  });

  // scroll to top width round fill
  const offset = 100;
  const scrollUp = document.querySelector('.scroll-up');
  const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
  const pathLength = scrollUpSvgPath.getTotalLength();
  scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';
  const getTop = () => window.pageYOffset || document.documentElement.scrollTop;
  const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);
    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
  };
  window.addEventListener('scroll', () => {
    updateDashoffset();
    if (getTop() > offset) {
      scrollUp.classList.add('scroll-up--active');
    } else {
      scrollUp.classList.remove('scroll-up--active');
    }
  });
  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  });

  // E-mail Ajax Send
  $('form').on('submit', function (event) {
    var inst = $('[data-remodal-id=modal]').remodal(); // инициализация плагина
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function () {
      $('.modal__title').css('display', 'none');
      $('.modal__title-send').css('display', 'block');
      $('.modal__submit').css('display', 'none');
      $('.modal__reset').css('display', 'inline-block');
      setTimeout(function () {
        inst.close();
      }, 4500);
      setTimeout(function () {
        th.trigger("reset");
        $('.modal__title').css('display', 'block');
        $('.modal__title-send').css('display', 'none');
        $('.modal__submit').css('display', 'inline-block');
        $('.modal__reset').css('display', 'none');
      }, 5000);
    });
    return false;
  });


});


// window.onload = dysTime;