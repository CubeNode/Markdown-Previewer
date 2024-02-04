import { marked } from 'marked'

console.log("Start");
const placeholderText = 
`# Welcome to my React Markdown Previewer
## Markdown text Demo


Single line of code: \`<div></div>\`

\`\`\` 
// Multi-line code block: 

function codeBlock(a, b){
  if(a !== b){
    return a + b;
  }
}
\`\`\`

Number List:
1. First Item
2. Second Item
3. Third Item

Unordered List:
* Asterisk
+ Plus
- Minus

> Line one of Block Quote
> Line two of Block Quote

**Bold text and Image example:**
![react logo](https://goo.gl/Umyytc)

[Here's a link to my GitHub](https://github.com/CubeNode)`

const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`
}

marked.setOptions({
  breaks: true,
  sanitize: true
})

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      input: placeholderText
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.rawMarkdown = this.rawMarkdown.bind(this);
  }
  
  handleChange(e){
    this.setState({
      input: e.target.value
    })
  }
  
  rawMarkdown = () => {
    let rawMarkup = marked(this.state.input, {renderer: renderer, sanitize: true});
    return { __html: rawMarkup };
  }
  
  render(){
   
    return(
      <div className="container">
        <div className="editor">
          <div className="div-heading" id="editor-div-heading">
            <p className="div-heading-text">Editor</p>
          </div>
          <textarea id="editor" onChange={this.handleChange}>{placeholderText}</textarea>
        </div>
        <div className="preview">
          <div className="div-heading" id="preview-div-heading">
            <p className="div-heading-text">Preview</p>
          </div>
          <div id="preview" dangerouslySetInnerHTML={this.rawMarkdown()}></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
