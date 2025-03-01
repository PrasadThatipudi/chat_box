const debug = function (arg) {
  console.log(arg);
  return arg;
};

const addAttributes = (node, attributes) =>
  Object.keys(attributes).forEach((property) => {
    node[property] = attributes[property];
  });

const createNode = (nodeName, attributes, textContent) => {
  const node = document.createElement(nodeName);

  node.textContent = textContent;
  addAttributes(node, attributes);

  return node;
};

const handleSendMessage = (event, chatBox) => {
  if (event.key === "Enter") {
    chatBox.textContent = [chatBox.textContent, event.target.value]
      .join("\n")
      .trim();
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
