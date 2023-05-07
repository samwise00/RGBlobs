"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[366],{72366:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AlchemyProvider:function(){return AlchemyProvider}});var LogLevel,ErrorCode,LogLevel1,ErrorCode1,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(18688),_ethersproject_networks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(45710),_ethersproject_providers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(82169),_ethersproject_web__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(37707);__webpack_require__(9669);let _permanentCensorErrors=!1,_censorErrors=!1,LogLevels={debug:1,default:2,info:2,warning:3,error:4,off:5},_logLevel=LogLevels.default,_globalLogger=null,_normalizeError=function(){try{let missing=[];if(["NFD","NFC","NFKD","NFKC"].forEach(form=>{try{if("test"!=="test".normalize(form))throw Error("bad normalize")}catch(error){missing.push(form)}}),missing.length)throw Error("missing "+missing.join(", "));if(String.fromCharCode(233).normalize("NFD")!==String.fromCharCode(101,769))throw Error("broken implementation")}catch(error){return error.message}return null}();(LogLevel=LogLevel1||(LogLevel1={})).DEBUG="DEBUG",LogLevel.INFO="INFO",LogLevel.WARNING="WARNING",LogLevel.ERROR="ERROR",LogLevel.OFF="OFF",(ErrorCode=ErrorCode1||(ErrorCode1={})).UNKNOWN_ERROR="UNKNOWN_ERROR",ErrorCode.NOT_IMPLEMENTED="NOT_IMPLEMENTED",ErrorCode.UNSUPPORTED_OPERATION="UNSUPPORTED_OPERATION",ErrorCode.NETWORK_ERROR="NETWORK_ERROR",ErrorCode.SERVER_ERROR="SERVER_ERROR",ErrorCode.TIMEOUT="TIMEOUT",ErrorCode.BUFFER_OVERRUN="BUFFER_OVERRUN",ErrorCode.NUMERIC_FAULT="NUMERIC_FAULT",ErrorCode.MISSING_NEW="MISSING_NEW",ErrorCode.INVALID_ARGUMENT="INVALID_ARGUMENT",ErrorCode.MISSING_ARGUMENT="MISSING_ARGUMENT",ErrorCode.UNEXPECTED_ARGUMENT="UNEXPECTED_ARGUMENT",ErrorCode.CALL_EXCEPTION="CALL_EXCEPTION",ErrorCode.INSUFFICIENT_FUNDS="INSUFFICIENT_FUNDS",ErrorCode.NONCE_EXPIRED="NONCE_EXPIRED",ErrorCode.REPLACEMENT_UNDERPRICED="REPLACEMENT_UNDERPRICED",ErrorCode.UNPREDICTABLE_GAS_LIMIT="UNPREDICTABLE_GAS_LIMIT",ErrorCode.TRANSACTION_REPLACED="TRANSACTION_REPLACED",ErrorCode.ACTION_REJECTED="ACTION_REJECTED";let HEX="0123456789abcdef";class Logger{constructor(version){Object.defineProperty(this,"version",{enumerable:!0,value:version,writable:!1})}_log(logLevel,args){let level=logLevel.toLowerCase();null==LogLevels[level]&&this.throwArgumentError("invalid log level name","logLevel",logLevel),_logLevel>LogLevels[level]||console.log.apply(console,args)}debug(...args){this._log(Logger.levels.DEBUG,args)}info(...args){this._log(Logger.levels.INFO,args)}warn(...args){this._log(Logger.levels.WARNING,args)}makeError(message,code,params){if(_censorErrors)return this.makeError("censored error",code,{});code||(code=Logger.errors.UNKNOWN_ERROR),params||(params={});let messageDetails=[];Object.keys(params).forEach(key=>{let value=params[key];try{if(value instanceof Uint8Array){let hex="";for(let i=0;i<value.length;i++)hex=HEX[value[i]>>4]+HEX[15&value[i]];messageDetails.push(key+"=Uint8Array(0x"+hex+")")}else messageDetails.push(key+"="+JSON.stringify(value))}catch(error){messageDetails.push(key+"="+JSON.stringify(params[key].toString()))}}),messageDetails.push(`code=${code}`),messageDetails.push(`version=${this.version}`);let reason=message,url="";switch(code){case ErrorCode1.NUMERIC_FAULT:{url="NUMERIC_FAULT";let fault=message;switch(fault){case"overflow":case"underflow":case"division-by-zero":url+="-"+fault;break;case"negative-power":case"negative-width":url+="-unsupported";break;case"unbound-bitwise-result":url+="-unbound-result"}break}case ErrorCode1.CALL_EXCEPTION:case ErrorCode1.INSUFFICIENT_FUNDS:case ErrorCode1.MISSING_NEW:case ErrorCode1.NONCE_EXPIRED:case ErrorCode1.REPLACEMENT_UNDERPRICED:case ErrorCode1.TRANSACTION_REPLACED:case ErrorCode1.UNPREDICTABLE_GAS_LIMIT:url=code}url&&(message+=" [ See: https://links.ethers.org/v5-errors-"+url+" ]"),messageDetails.length&&(message+=" ("+messageDetails.join(", ")+")");let error=Error(message);return error.reason=reason,error.code=code,Object.keys(params).forEach(function(key){error[key]=params[key]}),error}throwError(message,code,params){throw this.makeError(message,code,params)}throwArgumentError(message,name,value){return this.throwError(message,Logger.errors.INVALID_ARGUMENT,{argument:name,value:value})}assert(condition,message,code,params){condition||this.throwError(message,code,params)}assertArgument(condition,message,name,value){condition||this.throwArgumentError(message,name,value)}checkNormalize(message){_normalizeError&&this.throwError("platform missing String.prototype.normalize",Logger.errors.UNSUPPORTED_OPERATION,{operation:"String.prototype.normalize",form:_normalizeError})}checkSafeUint53(value,message){"number"==typeof value&&(null==message&&(message="value not safe"),(value<0||value>=9007199254740991)&&this.throwError(message,Logger.errors.NUMERIC_FAULT,{operation:"checkSafeInteger",fault:"out-of-safe-range",value:value}),value%1&&this.throwError(message,Logger.errors.NUMERIC_FAULT,{operation:"checkSafeInteger",fault:"non-integer",value:value}))}checkArgumentCount(count,expectedCount,message){message=message?": "+message:"",count<expectedCount&&this.throwError("missing argument"+message,Logger.errors.MISSING_ARGUMENT,{count:count,expectedCount:expectedCount}),count>expectedCount&&this.throwError("too many arguments"+message,Logger.errors.UNEXPECTED_ARGUMENT,{count:count,expectedCount:expectedCount})}checkNew(target,kind){(target===Object||null==target)&&this.throwError("missing new",Logger.errors.MISSING_NEW,{name:kind.name})}checkAbstract(target,kind){target===kind?this.throwError("cannot instantiate abstract class "+JSON.stringify(kind.name)+" directly; use a sub-class",Logger.errors.UNSUPPORTED_OPERATION,{name:target.name,operation:"new"}):(target===Object||null==target)&&this.throwError("missing new",Logger.errors.MISSING_NEW,{name:kind.name})}static globalLogger(){return _globalLogger||(_globalLogger=new Logger("logger/5.7.0")),_globalLogger}static setCensorship(censorship,permanent){if(!censorship&&permanent&&this.globalLogger().throwError("cannot permanently disable censorship",Logger.errors.UNSUPPORTED_OPERATION,{operation:"setCensorship"}),_permanentCensorErrors){if(!censorship)return;this.globalLogger().throwError("error censorship permanent",Logger.errors.UNSUPPORTED_OPERATION,{operation:"setCensorship"})}_censorErrors=!!censorship,_permanentCensorErrors=!!permanent}static setLogLevel(logLevel){let level=LogLevels[logLevel.toLowerCase()];if(null==level){Logger.globalLogger().warn("invalid log level - "+logLevel);return}_logLevel=level}static from(version){return new Logger(version)}}Logger.errors=ErrorCode1,Logger.levels=LogLevel1;let logger=new Logger("properties/5.7.0"),opaque={bigint:!0,boolean:!0,function:!0,number:!0,string:!0};class RequestBatcher{constructor(sendBatchFn,maxBatchSize=100){this.sendBatchFn=sendBatchFn,this.maxBatchSize=maxBatchSize,this.pendingBatch=[]}enqueueRequest(request){return(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__._)(this,void 0,void 0,function*(){let inflightRequest={request,resolve:void 0,reject:void 0},promise=new Promise((resolve,reject)=>{inflightRequest.resolve=resolve,inflightRequest.reject=reject});return this.pendingBatch.push(inflightRequest),this.pendingBatch.length===this.maxBatchSize?this.sendBatchRequest():this.pendingBatchTimer||(this.pendingBatchTimer=setTimeout(()=>this.sendBatchRequest(),10)),promise})}sendBatchRequest(){return(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__._)(this,void 0,void 0,function*(){let batch=this.pendingBatch;this.pendingBatch=[],this.pendingBatchTimer&&(clearTimeout(this.pendingBatchTimer),this.pendingBatchTimer=void 0);let request=batch.map(inflight=>inflight.request);return this.sendBatchFn(request).then(result=>{batch.forEach((inflightRequest,index)=>{let payload=result[index];if(payload.error){let error=Error(payload.error.message);error.code=payload.error.code,error.data=payload.error.data,inflightRequest.reject(error)}else inflightRequest.resolve(payload.result)})},error=>{batch.forEach(inflightRequest=>{inflightRequest.reject(error)})})})}}class AlchemyProvider extends _ethersproject_providers__WEBPACK_IMPORTED_MODULE_2__.r{constructor(config){let apiKey=AlchemyProvider.getApiKey(config.apiKey),alchemyNetwork=AlchemyProvider.getAlchemyNetwork(config.network),connection=AlchemyProvider.getAlchemyConnectionInfo(alchemyNetwork,apiKey,"http");void 0!==config.url&&(connection.url=config.url),connection.throttleLimit=config.maxRetries;let ethersNetwork=_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.E[alchemyNetwork];super(connection,ethersNetwork),this.apiKey=config.apiKey,this.maxRetries=config.maxRetries,this.batchRequests=config.batchRequests;let batcherConnection=Object.assign({},this.connection);batcherConnection.headers["Alchemy-Ethers-Sdk-Method"]="batchSend";let sendBatchFn=requests=>(0,_ethersproject_web__WEBPACK_IMPORTED_MODULE_3__.fetchJson)(batcherConnection,JSON.stringify(requests));this.batcher=new RequestBatcher(sendBatchFn)}static getApiKey(apiKey){if(null==apiKey)return _index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.D;if(apiKey&&"string"!=typeof apiKey)throw Error(`Invalid apiKey '${apiKey}' provided. apiKey must be a string.`);return apiKey}static getNetwork(network){return"string"==typeof network&&network in _index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.C?_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.C[network]:(0,_ethersproject_networks__WEBPACK_IMPORTED_MODULE_4__.H)(network)}static getAlchemyNetwork(network){if(void 0===network)return _index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.a;if("number"==typeof network)throw Error(`Invalid network '${network}' provided. Network must be a string.`);let isValidNetwork=Object.values(_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.N).includes(network);if(!isValidNetwork)throw Error(`Invalid network '${network}' provided. Network must be one of: ${Object.values(_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.N).join(", ")}.`);return network}static getAlchemyConnectionInfo(network,apiKey,type){let url="http"===type?(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.g)(network,apiKey):(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.b)(network,apiKey);return{headers:_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.I?{"Alchemy-Ethers-Sdk-Version":_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.V}:{"Alchemy-Ethers-Sdk-Version":_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.V,"Accept-Encoding":"gzip"},allowGzip:!0,url}}detectNetwork(){let _super=Object.create(null,{detectNetwork:{get:()=>super.detectNetwork}});return(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__._)(this,void 0,void 0,function*(){let network=this.network;if(null==network&&!(network=yield _super.detectNetwork.call(this)))throw Error("No network detected");return network})}_startPending(){(0,_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.l)("WARNING: Alchemy Provider does not support pending filters")}isCommunityResource(){return this.apiKey===_index_02af91ae_js__WEBPACK_IMPORTED_MODULE_1__.D}send(method,params){return this._send(method,params,"send")}_send(method,params,methodName,forceBatch=!1){let request={method,params,id:this._nextId++,jsonrpc:"2.0"},connection=Object.assign({},this.connection);if(connection.headers["Alchemy-Ethers-Sdk-Method"]=methodName,this.batchRequests||forceBatch)return this.batcher.enqueueRequest(request);this.emit("debug",{action:"request",request:function deepCopy(object){return function(object){if(function _isFrozen(object){if(null==object||opaque[typeof object])return!0;if(Array.isArray(object)||"object"==typeof object){if(!Object.isFrozen(object))return!1;let keys=Object.keys(object);for(let i=0;i<keys.length;i++){let value=null;try{value=object[keys[i]]}catch(error){continue}if(!_isFrozen(value))return!1}return!0}return logger.throwArgumentError(`Cannot deepCopy ${typeof object}`,"object",object)}(object))return object;if(Array.isArray(object))return Object.freeze(object.map(item=>deepCopy(item)));if("object"==typeof object){let result={};for(let key in object){let value=object[key];void 0!==value&&Object.defineProperty(result,key,{enumerable:!0,value:deepCopy(value),writable:!1})}return result}return logger.throwArgumentError(`Cannot deepCopy ${typeof object}`,"object",object)}(object)}(request),provider:this});let cache=["eth_chainId","eth_blockNumber"].indexOf(method)>=0;if(cache&&this._cache[method])return this._cache[method];let result=(0,_ethersproject_web__WEBPACK_IMPORTED_MODULE_3__.fetchJson)(this.connection,JSON.stringify(request),getResult).then(result=>(this.emit("debug",{action:"response",request,response:result,provider:this}),result),error=>{throw this.emit("debug",{action:"response",error,request,provider:this}),error});return cache&&(this._cache[method]=result,setTimeout(()=>{this._cache[method]=null},0)),result}}function getResult(payload){if(payload.error){let error=Error(payload.error.message);throw error.code=payload.error.code,error.data=payload.error.data,error}return payload.result}}}]);