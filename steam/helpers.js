module.exports.__function__ = function(args){
  var name = args.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));

  return name;
}