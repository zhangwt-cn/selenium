// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

const { BytesValue, Header } = require('./networkTypes')

class ContinueResponseParameters {
  #map = new Map()

  constructor(request) {
    this.#map.set('request', request)
  }

  cookies(cookieHeaders) {
    const cookies = []
    cookieHeaders.forEach((header) => {
      if (!(header instanceof Header)) {
        throw new Error(`CookieHeader must be an instance of Header. Received:'${header}'`)
      }
      cookies.push(Object.fromEntries(header.asMap()))
    })

    this.#map.set('cookies', cookies)
    return this
  }

  credentials(username, password) {
    if (typeof username !== 'string') {
      throw new Error(`Username must be a string. Received:'${username}'`)
    }

    if (typeof password !== 'string') {
      throw new Error(`Password must be a string. Received:'${password}'`)
    }

    this.#map.set('credentials', { type: 'password', username: username, password: password })

    return this
  }

  headers(headers) {
    const headerList = []
    headers.forEach((header) => {
      if (!(header instanceof Header)) {
        throw new Error(`Header value must be an instance of Header. Received:'${header}'`)
      }
      headerList.push(Object.fromEntries(header.asMap()))
    })

    this.#map.set('headers', headerList)
    return this
  }

  reasonPhrase(reasonPhrase) {
    if (typeof reasonPhrase !== 'string') {
      throw new Error(`Reason phrase must be a string. Received: '${reasonPhrase})'`)
    }
    this.#map.set('reasonPhrase', reasonPhrase)
    return this
  }

  statusCode(statusCode) {
    if (!Number.isInteger(statusCode)) {
      throw new Error(`Status must be an integer. Received:'${statusCode}'`)
    }

    this.#map.set('statusCode', statusCode)
    return this
  }

  asMap() {
    return this.#map
  }
}

module.exports = { ContinueResponseParameters }
