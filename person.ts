export type PersonWebappServlethyphenItemInitparam = {
  templatePath: string;
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
};

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