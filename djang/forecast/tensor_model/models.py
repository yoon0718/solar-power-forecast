from django.db import models

# Create your models here.

# model 인식

class GenerateData(models.Model):
    index = models.BigAutoField(primary_key=True)
    loc = models.TextField(db_column='LOC', blank=True, null=True)  # Field name made lowercase.
    tm = models.BigIntegerField(db_column='TM', blank=True, null=True)  # Field name made lowercase.
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'generate_data'


class MeanWeather(models.Model):
    index = models.BigIntegerField(primary_key=True)
    tm = models.BigIntegerField(db_column='TM', blank=True, null=True)  # Field name made lowercase.
    loc = models.TextField(db_column='LOC', blank=True, null=True)  # Field name made lowercase.
    wd = models.BigIntegerField(db_column='WD', blank=True, null=True)  # Field name made lowercase.
    ws = models.FloatField(db_column='WS', blank=True, null=True)  # Field name made lowercase.
    pa = models.FloatField(db_column='PA', blank=True, null=True)  # Field name made lowercase.
    ps = models.FloatField(db_column='PS', blank=True, null=True)  # Field name made lowercase.
    ta = models.FloatField(db_column='TA', blank=True, null=True)  # Field name made lowercase.
    td = models.FloatField(db_column='TD', blank=True, null=True)  # Field name made lowercase.
    hm = models.FloatField(db_column='HM', blank=True, null=True)  # Field name made lowercase.
    pv = models.FloatField(db_column='PV', blank=True, null=True)  # Field name made lowercase.
    rn_day = models.FloatField(db_column='RN_DAY', blank=True, null=True)  # Field name made lowercase.
    sd_tot = models.FloatField(db_column='SD_TOT', blank=True, null=True)  # Field name made lowercase.
    ca_tot = models.FloatField(db_column='CA_TOT', blank=True, null=True)  # Field name made lowercase.
    ca_mid = models.FloatField(db_column='CA_MID', blank=True, null=True)  # Field name made lowercase.
    vs = models.BigIntegerField(db_column='VS', blank=True, null=True)  # Field name made lowercase.
    ss = models.FloatField(db_column='SS', blank=True, null=True)  # Field name made lowercase.
    si = models.FloatField(db_column='SI', blank=True, null=True)  # Field name made lowercase.
    ts = models.FloatField(db_column='TS', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mean_weather'


class WeatherData(models.Model):
    index = models.BigAutoField(primary_key=True)
    loc = models.TextField(db_column='LOC', blank=True, null=True)  # Field name made lowercase.
    tm = models.BigIntegerField(db_column='TM', blank=True, null=True)  # Field name made lowercase.
    stn = models.BigIntegerField(db_column='STN', blank=True, null=True)  # Field name made lowercase.
    wd = models.BigIntegerField(db_column='WD', blank=True, null=True)  # Field name made lowercase.
    ws = models.FloatField(db_column='WS', blank=True, null=True)  # Field name made lowercase.
    pa = models.FloatField(db_column='PA', blank=True, null=True)  # Field name made lowercase.
    ps = models.FloatField(db_column='PS', blank=True, null=True)  # Field name made lowercase.
    ta = models.FloatField(db_column='TA', blank=True, null=True)  # Field name made lowercase.
    td = models.FloatField(db_column='TD', blank=True, null=True)  # Field name made lowercase.
    hm = models.FloatField(db_column='HM', blank=True, null=True)  # Field name made lowercase.
    pv = models.FloatField(db_column='PV', blank=True, null=True)  # Field name made lowercase.
    rn_day = models.FloatField(db_column='RN_DAY', blank=True, null=True)  # Field name made lowercase.
    sd_tot = models.FloatField(db_column='SD_TOT', blank=True, null=True)  # Field name made lowercase.
    ca_tot = models.BigIntegerField(db_column='CA_TOT', blank=True, null=True)  # Field name made lowercase.
    ca_mid = models.BigIntegerField(db_column='CA_MID', blank=True, null=True)  # Field name made lowercase.
    vs = models.BigIntegerField(db_column='VS', blank=True, null=True)  # Field name made lowercase.
    ss = models.FloatField(db_column='SS', blank=True, null=True)  # Field name made lowercase.
    si = models.FloatField(db_column='SI', blank=True, null=True)  # Field name made lowercase.
    ts = models.FloatField(db_column='TS', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'weather_data'