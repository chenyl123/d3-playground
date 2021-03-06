d3 = require('d3');
marked = require('marked');
js_yaml = require('js-yaml');

body = d3.select('body')
  .style('padding', '1em');

body.append('h1')
  .html('d3-playground');

review_button = body.append('button')
  .style('display', 'none')
  .html('Review the code')
  .on('click', review);

hide_button = body.append('button')
  .style('display', 'block')
  .html('Hide the code')
  .on('click', hide);

code = body.append('pre')
  .attr('contenteditable', true)
  .style('display', 'block')
  .style('white-space', 'pre-wrap')
  .style('padding','1em')
  .style('border','1px solid #CCC');

function review () {
  review_button.style('display', 'none');
  hide_button.style('display', 'block');
  code.style('display', 'block');
}

function hide () {
  hide_button.style('display', 'none');
  review_button.style('display', 'block');
  code.style('display', 'none');
}

run_button = body.append('button')
  .style('display', 'block')
  .html('Run the code')
  .on('click', run);

function run () {
  eval(code.text());
}

src = location.hash.replace(/^#/, '') || 'sandbox.js';

d3.text(src, function (e, d){
  if(!e) {
    code.text(d);
  }
  else {
    code.text('// Error: ' + e.statusText);
    console.log(e);
  }
})
