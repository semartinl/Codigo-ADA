# :dart: Summary

Setting a new endpoint `api/tenants` in order to create and add new tenants.

# :thinking: Type

* [x] :sparkles: New feature
* [ ] :bug: Bug fix
* [ ] :construction_worker: Technical debt
* [ ] :radioactive:️ Breaking change (it breaks backward compatibility)
* [ ] :books: Requires a change in the docs

# :alembic:️ Solution
A new endpoint was created `api/tenants` in order to generate and add a new tenant in our database, setting the configuration, the URLs return and mobbscan, licenseId, the proccess type, timeout of JWT token, theme and the security. 

This new endpoint allows you to easily generate a new tenant with all the corresponding and desired settings.

To do that, It was generate the model of tenant, his service and repository, the new controller of tenant and their respective request and responses of the function.


* **:link: JIRA**: [MOBBSCAN-7237](https://issues.mobbeel.com/browse/MOBBSCAN-7237)

# :microscope: Tests

1. Checkout the branch `feature/MOBBSCAN-7237_add-create-tenant-endpoint` of `mobbscan-gateway-api`
1. Deploy mobbscan-gateway-api by executing the following commands:

   ```
   sh dockersecrets.sh
   ./gradlew dockerTag --stacktrace
   docker stack deploy -c docker-compose.yml api-gateway
   ```

1. Perform the following request and check that an event arrives succesfully:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbScanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"https://google.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```

# :microscope: Tests errors

The following requests should throw errors because they do not meet the requirements:

1. Request without `tenantName`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbScanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"https://google.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
2. Request without `licenseId`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanUsername",
    "mobbscanPassword" : "YourMobbScanPassword",
    "licenseId":"",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"https://google.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
3. Request without `mobbscanUrl`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
4. Request with invalid `mobbscanUrl`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"ftp://example.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
5. Request with invalid `returnUrl`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"ftp://example.com",
    "mobbscanUrl":"https://example.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
6. Request without `returnUrl`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"",
    "mobbscanUrl":"https://example.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
7. Request without `proccessType`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"https://example.com",
    "timeoutJwtToken": 3000,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
1. Request with invalid `timeoutJwtToken`:

   ```
   curl --location 'http://localhost:8088/api/tenants' \
       --header 'Content-Type: application/json' \
       --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0LXNhbnRpYWdvIiwicm9sZXMiOlsiUk9MRV9BUEkiXSwiaWF0IjoxNzQ4ODQ4NDE5LCJleHAiOjE3NDk0NDg0MTl9.sTjK8TtF01H_VG5TUSxiZOd6hHHTX_AndQs0CMjgO0C47tKQElw0n7VaP71H1SpLhnT2DRdVloPJHXNf83eA7w' \
       --data '{
    "tenantName": "YourTenantName",
    "mobbscanUsername": "YourMobbScanName",
    "mobbscanPassword" : "YourMobbscanPassword",
    "licenseId":"YOUR-license",
        "processType":"recording",
    "returnUrl":"https://example.com",
    "mobbscanUrl":"https://example.com",
    "timeoutJwtToken": 35791,
    "tenantConfig": {"steps": [
        {
            "type": "instruction",
            "options": {
                "media": {
                    "head": null,
                    "main": "https://d1albn8vwddszp.cloudfront.net/img/placeholder-record-video-laptop.png"
                },
                "stepType": "video-recording"
            }
        },
        {
            "type": "video-recording",
            "options": {
                "steps": [
                    {
                        "type": "document",
                        "options": {
                            "countries": [
                                "ESP"
                            ],
                            "documentTypes": [
                                {
                                    "document": "DOCUMENT",
                                    "operationMode": "SCAN_BOTH_SIDES",
                                    "documentTypeMobbScan": "ESP"
                                }
                            ]
                        }
                    },
                    {
                        "type": "face",
                        "options": {
                            "analysis": "passive"
                        }
                    }
                ]
            }
        }
    ],
    "config": {
        "customTheme": true
        }
    },

    "theme":{"app_color_primary": "#006F93"},

    "securityEnabled":true
    }'
   ```
   
# 🧐 Checklist:

* [x] The code follow the project guidelines.
* [x] The changes have been tested locally.
* [x] The code has internal docs.
* [ ] Docs are updated (README, public docs, etc.)
* [ ] Some tests have been added to check that the changes work as expected (unit, integration or e2e tests ...)
* [ ] Unit tests are running without errors.
* [ ] Other dependant changes have already been merged.

