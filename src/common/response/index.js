class Response {

  constructor(build) {
    this.s = build.s
    //this.code = build.code
    this.m = build.m
    this.r = build.r
    this.error=build.error
    this.errorMessage=build.errorMessage
    this.tr=build.tr
    this.page= build.page
    this.pages = build.pages
  }
}


class Builder {
    constructor(s, code) {
      this.s = s
      //this.code = code
    }

  setPagination(tr,page,pages)
  {
    this.tr=tr
    this.page= page
    this.pages = pages
    return this
  }

  setMessage(m) {
    this.m = m
    return this
  }

  setResultData(r) {
    this.r = r
    return this
  }

  setErrorData(error) {
    this.error = error
    return this
  }

  setErrorMessage(message)
  {
    this.errorMessage=message
    return this
  }

  build() {
    return new Response(this)
  }
}

export default Builder
