To run demo
* npm install && npm start

To fix issue with rnd source:
* stop devserver
* open node_modules/react-rnd/lib/index.js and comment out this line: if (!this.state.isMounted) return createElement('div', null); (currently at line 334)
* npm start