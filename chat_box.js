const debug = function (arg) {
  console.log(arg);
  return arg;
};

const addStyles = (node, style) =>
  Object.keys(style).map((key) => (node.style[key] = style[key]));

const addAttributes = (node, attributes) => {
  const { style, ...rest } = attributes;

  if (style) addStyles(node, style);

  Object.keys(rest).forEach((property) => {
    node[property] = rest[property];
  });
};

const createNode = (nodeName, attributes, textContent) => {
  const node = document.createElement(nodeName);

  node.textContent = textContent;
  addAttributes(node, attributes);

  return node;
};

const handleSendMessage = (event, chatBox) => {
  if (event.key === "Enter" && event.target.value) {
    const message = event.target.value;
    const msgAttributes = {
      className: "message",
      style: {
        // width: ``,
      },
    };
    const messageBox = createNode("p", msgAttributes, message);
    chatBox.appendChild(messageBox);
    event.target.value = "";
  }
};

const makeChatBox = () => {
  const textBoxAttributes = { id: "text-box", autofocus: true };

  const parent = createNode("div", { id: "parent" });
  const textBox = createNode("input", textBoxAttributes);
  const chatBox = createNode("div", { id: "chat-box" });

  parent.appendChild(chatBox);
  parent.appendChild(textBox);
  document.body.appendChild(parent);

  textBox.onkeydown = (event) => handleSendMessage(event, chatBox);
};

window.onload = makeChatBox;
