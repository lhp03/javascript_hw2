import { writeFile } from "fs";

class GenericElement {
  constructor(name) {
    this.name = name;
  }

  addAttr(name, value) {
    this[name] = value;
  }

  setAttr(name, value) {
    this[name] = value;
  }

  addAttrs(obj) {
    Object.keys(obj).map((key) => {
      this[key] = obj[key];
    });
  }

  removeAttrs(att) {
    delete this[att];
  }

  toString() {
    let string = "<";
    string += this.name;
    Object.keys(this).map((key) => {
      string += ` ${key}="${this[key]}"`;
    });

    string += `>\n</${this.name}>\n`;

    return string;
  }
}

class RootElement {
  constructor() {
    this.xmlns = "http://www.w3.org/2000/svg";
    this.child = [];
  }

  addAttr(name, value) {
    this[name] = value;
  }

  setAttr(name, value) {
    this[name] = value;
  }

  addAttrs(obj) {
    Object.keys(obj).map((key) => {
      this[key] = obj[key];
    });
  }

  removeAttrs(att) {
    att.map((key) => {
      delete this[key];
    });
  }

  addChild(child) {
    this.child.push(child);
  }

  toString() {
    let string = "<svg";
    Object.keys(this).map((key) => {
      if (key !== "child") {
        string += ` ${key}="${this[key]}"`;
      }
    });
    string += ">\n";

    this.child.map((child) => {
      string += child.toString();
    });
    string += `</svg>\n`;

    return string;
  }

  write(finleName, cb) {
    writeFile(finleName, this.toString(), (err) => {
      if (err) throw err;
      cb();
    });
  }
}

class RectangleElement extends GenericElement {
  constructor(x, y, width, height, fill) {
    super("rect");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
  }
}

class TextElement extends GenericElement {
  constructor(x, y, fontSize, fill, content) {
    super("text");
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fill = fill;
    this.content = content;
  }

  toString() {
    let string = "<";
    string += this.name;
    Object.keys(this).map((key) => {
      if (key !== "content") {
        let value = this[key];
        if (key === "fontSize") key = "font-size";
        string += ` ${key}="${value}"`;
      }
    });

    string += `>${this.content}\n</${this.name}>\n`;

    return string;
  }
}

/*
// the following is used for testing
// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({ width: 800, height: 170, abc: 200, def: 400 });
root.removeAttrs(["abc", "def", "non-existent-attribute"]);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement("circle");
c.addAttr("r", 75);
c.addAttr("fill", "yellow");
c.addAttrs({ cx: 200, cy: 80 });
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, "blue");
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, "red", "wat is a prototype? 😬");
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
root.write("test.svg", () => console.log("done writing!"));
*/

export { GenericElement, RootElement, RectangleElement, TextElement };
