export type PersonWebappServlethyphenItemInitparam = {
  "configGlossary:installationAt": string;
  "configGlossary:adminEmail": string;
  "configGlossary:poweredBy": string;
  "configGlossary:poweredByIcon": string;
  "configGlossary:staticPath": string;
  templateProcessorClass: string;
  templateLoaderClass: string;
  templatePath: string;
  templateOverridePath: string;
  defaultListTemplate: string;
  defaultFileTemplate: string;
  useJSP: boolean;
  jspListTemplate: string;
  jspFileTemplate: string;
  cachePackageTagsTrack: number;
  cachePackageTagsStore: number;
  cachePackageTagsRefresh: number;
  cacheTemplatesTrack: number;
  cacheTemplatesStore: number;
  cacheTemplatesRefresh: number;
  cachePagesTrack: number;
  cachePagesStore: number;
  cachePagesRefresh: number;
  cachePagesDirtyRead: number;
  searchEngineListTemplate: string;
  searchEngineFileTemplate: string;
  searchEngineRobotsDb: string;
  useDataStore: boolean;
  dataStoreClass: string;
  redirectionClass: string;
  dataStoreName: string;
  dataStoreDriver: string;
  dataStoreUrl: string;
  dataStoreUser: string;
  dataStorePassword: string;
  dataStoreTestQuery: string;
  dataStoreLogFile: string;
  dataStoreInitConns: number;
  dataStoreMaxConns: number;
  dataStoreConnUsageLimit: number;
  dataStoreLogLevel: string;
  maxUrlLength: number;
  mailHost: string;
  mailHostOverride: string;
  log: number;
  logLocation: string;
  logMaxSize: string;
  dataLog: number;
  dataLogLocation: string;
  dataLogMaxSize: string;
  removePageCache: string;
  removeTemplateCache: string;
  fileTransferFolder: string;
  lookInContext: number;
  adminGroupID: number;
  betaServer: boolean;
}

export type PersonWebappServlethyphenItem = {
  "servlet-name": string;
  "servlet-class": string;
  "init-param": PersonWebappServlethyphenItemInitparam;
};

export type PersonWebappServletmapping = {
  cofaxCDS: string;
  cofaxEmail: string;
  cofaxAdmin: string;
  fileServlet: string;
  cofaxTools: string;
};

export type PersonWebappTaglib = {
  "taglib-uri": string;
  "taglib-location": string;
};

export type PersonWebapp = {
    "servlet-hyphen": PersonWebappServlethyphenItem[];
    "servlet-mapping": PersonWebappServletmapping;
    taglib: PersonWebappTaglib;
};

export type Person = {
  "web-app": PersonWebapp;
};