from django.db import models

class ErrorObject(models.Model):
    code = models.CharField("Error Code", max_length=20, default="")
    slug = models.CharField("Error Slug", max_length=20, default="")

    def __str___(self):
        return self.code