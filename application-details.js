/* Application Details — category strip + content switcher */

(function () {
  'use strict';

  var APPS = {
    'wire-cable': {
      title: 'Electrical',
      accent: '& Wiring',
      crumb: 'Electrical & Wiring',
      desc: 'Our PVC compounds deliver excellent electrical insulation, flame retardancy, and long-term reliability for wires, cables, and electrical accessories used in residential, commercial, and industrial systems.',
      image: 'appication deatils banner section.png',
      why: 'Engineered to meet the stringent demands of electrical applications, ensuring safety, performance, and durability.',
      examples: [
        { img: 'Wire & Cables.png', label: 'Power Cables' },
        { img: 'Untitled design/1.png', label: 'House Wiring' },
        { img: 'Wide Range of Applications 2.png', label: 'Control Cables' },
        { img: 'plugs-and-cords-transparent.png', label: 'Switches & Sockets' },
        { img: 'Wire & Cables.png', label: 'Conduits & Trunking' },
        { img: 'plugs-and-cords.png', label: 'Cable Accessories' }
      ]
    },
    'pipes-fittings': {
      title: 'Garden &',
      accent: 'Soft PVC Pipes',
      crumb: 'Garden & Soft PVC Pipes',
      desc: 'Flexible soft PVC compounds for garden hoses, irrigation tubing, and soft pipe systems that need bendability, durability, and consistent extrusion quality.',
      image: 'PVC Hose Pipe transparent.png',
      why: 'Engineered for flexible hose and soft pipe production — delivering smooth extrusion, kink resistance, and long service life outdoors.',
      examples: [
        { img: 'PVC Hose Pipe transparent.png', label: 'Garden Hose' },
        { img: 'Wide Range of Applications 8.png', label: 'Irrigation Tubing' },
        { img: 'Untitled design/8.png', label: 'Soft PVC Pipes' },
        { img: 'Wide Range of Applications 5.png', label: 'Flexible Conduit' },
        { img: 'Untitled design/2.png', label: 'Hose Assemblies' },
        { img: 'Wide Range of Applications 2.png', label: 'Water Transfer Lines' }
      ]
    },
    'profile-building': {
      title: 'Profiles',
      accent: '& Extrusions',
      crumb: 'Profiles & Extrusions',
      desc: 'Durable PVC profile compounds for extrusions, windows, doors, panels, and structural applications that demand weatherability and finish quality.',
      image: 'Untitled design/3.png',
      why: 'Formulated for dimensional stability, UV resistance, and surface finish — ideal for architectural profiles and extruded building components.',
      examples: [
        { img: 'Untitled design/3.png', label: 'Window Profiles' },
        { img: 'Wide Range of Applications 3.png', label: 'Door Frames' },
        { img: 'Untitled design/5.png', label: 'Wall Panels' },
        { img: 'Wide Range of Applications 5.png', label: 'Ceiling Profiles' },
        { img: 'Untitled design/6.png', label: 'Trim & Beading' },
        { img: 'Wide Range of Applications 7.png', label: 'Structural Parts' }
      ]
    },
    footwear: {
      title: 'Footwear',
      accent: 'Components',
      crumb: 'Footwear Components',
      desc: 'Flexible, comfortable PVC compounds for footwear soles, straps, and accessories with consistent processability and long wear life.',
      image: 'Untitled design/4.png',
      why: 'Designed for comfort, flex fatigue resistance, and excellent flow for injection and molding footwear applications.',
      examples: [
        { img: 'Untitled design/4.png', label: 'Shoe Soles' },
        { img: 'Footwear.png', label: 'Sandals' },
        { img: 'Footwear.png', label: 'Footwear Straps' },
        { img: 'Wide Range of Applications 4.png', label: 'Heels & Tips' },
        { img: 'Untitled design/4.png', label: 'Insoles' },
        { img: 'Wide Range of Applications 4.png', label: 'Accessories' }
      ]
    },
    roofing: {
      title: 'Packaging',
      accent: 'Solutions',
      crumb: 'Packaging Solutions',
      desc: 'Reliable PVC compounds for packaging films, containers, and protective packaging that need clarity, strength, and process consistency.',
      image: 'Untitled design/5.png',
      why: 'Stabilized for visual clarity, sealability, and mechanical strength — suited to packaging films, thermoformed trays, and protective wraps.',
      examples: [
        { img: 'Untitled design/5.png', label: 'Packaging Films' },
        { img: 'Wide Range of Applications 5.png', label: 'Containers' },
        { img: 'Untitled design/3.png', label: 'Thermoformed Trays' },
        { img: 'Wide Range of Applications 3.png', label: 'Protective Wraps' },
        { img: 'Untitled design/8.png', label: 'Blister Packs' },
        { img: 'Wide Range of Applications 8.png', label: 'Industrial Packaging' }
      ]
    },
    'molding-others': {
      title: 'Soft PVC',
      accent: 'Molding',
      crumb: 'Soft PVC Molding',
      desc: 'High-quality soft PVC compounds for precision molding of plugs, cords, and components with smooth finishes.',
      image: 'plugs-and-cords-transparent.png',
      why: 'Tailored formulations support complex geometries, color consistency, and dependable cycle-to-cycle molding for plugs, cords and related parts.',
      examples: [
        { img: 'plugs-and-cords-transparent.png', label: 'Plugs & Cords' },
        { img: 'Wire & Cables.png', label: 'Wire & Cables' },
        { img: 'Untitled design/1.png', label: 'House Wires' },
        { img: 'Untitled design/4.png', label: 'Footwear' },
        { img: 'Wide Range of Applications 4.png', label: 'Custom Moldings' }
      ]
    },
    medical: {
      title: 'Medical',
      accent: 'Devices',
      crumb: 'Medical Devices',
      desc: 'Carefully formulated compounds for selected medical and healthcare devices where purity, consistency, and process control matter.',
      image: 'Untitled design/7.png',
      why: 'Produced with controlled processes and quality checks to support demanding medical-grade applications and compliance-focused customers.',
      examples: [
        { img: 'Untitled design/7.png', label: 'Medical Tubing' },
        { img: 'Wide Range of Applications 7.png', label: 'Healthcare Parts' },
        { img: 'Untitled design/2.png', label: 'Flexible Profiles' },
        { img: 'Wide Range of Applications 2.png', label: 'Device Housings' },
        { img: 'Untitled design/6.png', label: 'Protective Covers' },
        { img: 'Wide Range of Applications 6.png', label: 'Accessories' }
      ]
    },
    agriculture: {
      title: 'Construction',
      accent: 'Materials',
      crumb: 'Construction Materials',
      desc: 'PVC compounds for construction sheets, profiles, and related materials that need weather resistance, strength, and long outdoor service.',
      image: 'Untitled design/8.png',
      why: 'Built for outdoor and site service with impact strength and durability suitable for construction and infrastructure use.',
      examples: [
        { img: 'Untitled design/8.png', label: 'Building Sheets' },
        { img: 'Wide Range of Applications 8.png', label: 'Construction Profiles' },
        { img: 'Untitled design/2.png', label: 'Panel Systems' },
        { img: 'Wide Range of Applications 2.png', label: 'Waterproof Layers' },
        { img: 'Untitled design/5.png', label: 'Site Coverings' },
        { img: 'Wide Range of Applications 5.png', label: 'Structural Parts' }
      ]
    }
  };

  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || 'wire-cable';
  }

  function setText(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }

  function applyApp(key) {
    var data = APPS[key] || APPS['wire-cable'];
    document.title = data.crumb + ' – Application Details | Madhav Polymers';

    var crumb = document.querySelector('.ad-bc-active');
    if (crumb) crumb.textContent = data.crumb;

    setText(document.querySelector('.ad-hero-title'), data.title + ' <span class="ad-hero-accent">' + data.accent + '</span>');

    var desc = document.querySelector('.ad-hero-desc');
    if (desc) desc.textContent = data.desc;

    var hero = document.getElementById('hero');
    if (hero && data.image) {
      hero.style.backgroundImage = "url('" + data.image.replace(/'/g, "\\'") + "')";
      hero.style.backgroundSize = 'contain';
      hero.style.backgroundRepeat = 'no-repeat';
      hero.style.backgroundPosition = 'right center';
    }

    var why = document.querySelector('.ad-block .ad-copy');
    if (why) why.textContent = data.why;

    var exampleNodes = document.querySelectorAll('.ad-example');
    exampleNodes.forEach(function (node, i) {
      var ex = data.examples[i];
      if (!ex) {
        node.style.display = 'none';
        return;
      }
      node.style.display = '';
      var img = node.querySelector('img');
      var h3 = node.querySelector('h3');
      if (img) {
        img.src = ex.img;
        img.alt = ex.label;
      }
      if (h3) h3.textContent = ex.label;
    });

    document.querySelectorAll('.ad-app-card').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-app') === key);
    });

    var activeCard = document.querySelector('.ad-app-card.is-active');
    if (activeCard && track) {
      activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  var current = qs('app');
  if (!APPS[current]) current = 'wire-cable';

  var track = document.getElementById('ad-cats-track');
  var prev = document.getElementById('ad-cats-prev');
  var next = document.getElementById('ad-cats-next');

  applyApp(current);

  if (prev && track) {
    prev.addEventListener('click', function () {
      track.scrollBy({ left: -360, behavior: 'smooth' });
    });
  }
  if (next && track) {
    next.addEventListener('click', function () {
      track.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }
})();
