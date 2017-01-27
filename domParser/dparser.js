(function() {
	

var htmlNode = document.createElement("p") ;
            htmlNode.innerHTML ='one two three <span style="color:red">span_tag_text<h3>h3_not_printed</h3></span> four five';

var nodeDataList=[];

		var domParser = function (n, f){
				
						if (document.createTreeWalker) {
							w = document.createTreeWalker(n, NodeFilter.SHOW_ALL, null, false);

							//point to first node after p tag in this case it is textNode (one two three)
							n = w.nextNode();
							f.call(this, n);

							while ((n = w.nextSibling()) != null) {
								//call  function in domParser declared in line 25
								f.call(this, n);
							}
						}
				};
				
				domParser(htmlNode, function (n) {
					var nodeData = {};
					if(n.nodeType == 3){
						nodeData.type = 'Text';
						nodeData.Content = n.textContent;
						
					}
					else{

						nodeData.type = 'HtmlTag';
						nodeData.name = n.tagName;
						nodeData.Content = n.textContent;

						if(n.hasAttributes()){

							nodeData.attributes = [];

							for(var i=0; i < n.attributes.length; i++){

								var attr = {};
								attr[n.attributes[0].name] = n.attributes[0].value;
								nodeData.attributes.push(attr);
								

							}

						}
						

					}

					nodeDataList.push(nodeData);

					console.log(n);
					
						
				});

				console.log(nodeDataList);


}());
