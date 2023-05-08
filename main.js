!(function (a, b, c, d, e, f, g, h, i) {
  function j(a) {
    var b,
      c = a.length,
      e = this,
      f = 0,
      g = (e.i = e.j = 0),
      h = (e.S = []);
    for (c || (a = [c++]); d > f; ) h[f] = f++;
    for (f = 0; d > f; f++)
      (h[f] = h[(g = s & (g + a[f % c] + (b = h[f])))]), (h[g] = b);
    (e.g = function (a) {
      for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--; )
        (b = h[(f = s & (f + 1))]),
          (c = c * d + h[s & ((h[f] = h[(g = s & (g + b))]) + (h[g] = b))]);
      return (e.i = f), (e.j = g), c;
    })(d);
  }
  function k(a, b) {
    var c,
      d = [],
      e = typeof a;
    if (b && "object" == e)
      for (c in a)
        try {
          d.push(k(a[c], b - 1));
        } catch (f) {}
    return d.length ? d : "string" == e ? a : a + "\0";
  }
  function l(a, b) {
    for (var c, d = a + "", e = 0; e < d.length; )
      b[s & e] = s & ((c ^= 19 * b[s & e]) + d.charCodeAt(e++));
    return n(b);
  }
  function m(c) {
    try {
      return o
        ? n(o.randomBytes(d))
        : (a.crypto.getRandomValues((c = new Uint8Array(d))), n(c));
    } catch (e) {
      return [+new Date(), a, (c = a.navigator) && c.plugins, a.screen, n(b)];
    }
  }
  function n(a) {
    return String.fromCharCode.apply(0, a);
  }
  var o,
    p = c.pow(d, e),
    q = c.pow(2, f),
    r = 2 * q,
    s = d - 1,
    t = (c["seed" + i] = function (a, f, g) {
      var h = [];
      f = 1 == f ? { entropy: !0 } : f || {};
      var o = l(k(f.entropy ? [a, n(b)] : null == a ? m() : a, 3), h),
        s = new j(h);
      return (
        l(n(s.S), b),
        (
          f.pass ||
          g ||
          function (a, b, d) {
            return d ? ((c[i] = a), b) : a;
          }
        )(
          function () {
            for (var a = s.g(e), b = p, c = 0; q > a; )
              (a = (a + c) * d), (b *= d), (c = s.g(1));
            for (; a >= r; ) (a /= 2), (b /= 2), (c >>>= 1);
            return (a + c) / b;
          },
          o,
          "global" in f ? f.global : this == c
        )
      );
    });
  if ((l(c[i](), b), g && g.exports)) {
    g.exports = t;
    try {
      o = require("crypto");
    } catch (u) {}
  } else
    h &&
      h.amd &&
      h(function () {
        return t;
      });
})(
  this,
  [],
  Math,
  256,
  6,
  52,
  "object" == typeof module && module,
  "function" == typeof define && define,
  "random"
);

Math.seedrandom("center");

let dimension = 800;
let elements = [];
const canvas = document.getElementById("myCanvas");
canvas.width = dimension;
canvas.height = dimension;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Element {
  constructor(x, y, color, mass, speed, id) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.mass = mass;
    this.speed = speed;
    this.id = id;
  }
  update() {
    //attraction
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] != this) {
        let dx = elements[i].x - this.x;
        let dy = elements[i].y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        //if (dist < 1000) {
        let force =
          (((0.001 * this.mass * elements[i].mass) / dist) * dist * 0.8) /
          (this.mass * 2);
        this.speed.x += (force * dx) / dist;
        8;
        this.speed.y += (force * dy) / dist;
        //}
      }
    }
    //damping
    this.speed.x *= 0.99999;
    this.speed.y *= 0.99999;
  }
  draw() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    if (this.id % 2 == 0) {
      ctx.fillStyle = "rgba(255,255,255,1)";
    } else {
      ctx.fillStyle = "rgba(0,0,0,1)";
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.mass, 0, 2 * Math.PI);
    //ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 20; i++) {
    elements.push(
      new Element(
        Math.random() * dimension,
        Math.random() * dimension ,
        "blue",
        Math.random() * 20,
        { x: 0, y: 0 },
        i
      )
    );
  }
}

function step() {
  //ctx.fillStyle = "red";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  //
  ctx.fillStyle = "rgba(255,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //
  for (let i = 0; i < elements.length; i++) {
    elements[i].update();
  }
  for (let i = 0; i < elements.length; i++) {
    elements[i].draw();
  }
  requestAnimationFrame(step);
}
init();
step();
