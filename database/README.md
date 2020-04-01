## Database Models

### Email
|**key**|**type**|
|-------|--------|
|id|integer|
|email_address|string|

### Subscription
|**key**|**type**|
|-------|--------|
|id|integer|
|email_id|integer|
|subscription_region_id|intger|

### Subscription Region
|**key**|**type**|
|-------|--------|
|id|integer|
|subscription_id|integer|
|region_id|intger|

### Region
|**key**|**type**|
|-------|--------|
|id|integer|
|name|string|

### State
|**key**|**type**|
|-------|--------|
|id|integer|
|name|string|
|region_id|integer|
|confirmed_cases|integer|
|deaths|integer|
|recovered|integer|