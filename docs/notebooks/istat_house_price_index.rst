
Notebook: using jsonstat.py to explore ISTAT data (house price index)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This Jupyter notebook shows how to use
`jsonstat.py <http://github.com/26fe/jsonstat.py>`__ python library to
explore Istat data. `Istat <http://www.istat.it/en/about-istat>`__ is
Italian National Institute of Statistics. It publishs a rest api for
querying italian statistics.

We starts importing some modules.

.. code:: python

    from __future__ import print_function
    import os
    import istat
    from IPython.core.display import HTML

Step 1: using istat module to get a jsonstat collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Following code sets a cache dir where to store json files download by
Istat api. Storing file on disk speed up development, and assures
consistent results over time. Anyway you can delete file to donwload a
fresh copy.

.. code:: python

    cache_dir = os.path.abspath(os.path.join("..", "tmp", "istat_cached"))
    istat.cache_dir(cache_dir)
    print("cache_dir is '{}'".format(istat.cache_dir()))


.. parsed-literal::

    cache_dir is '/Users/26fe_nas/gioprj.on_mac/prj.python/jsonstat.py/tmp/istat_cached'


Using istat api, we can shows the istat areas used to categorize the
datasets

.. code:: python

    istat.areas()




.. raw:: html

    <table><tr><th>id</th><th>desc</th></tr><tr><td>3</td><td>2011 Population and housing census</td></td></tr><tr><td>4</td><td>Enterprises</td></td></tr><tr><td>7</td><td>Environment and Energy</td></td></tr><tr><td>8</td><td>Population and Households</td></td></tr><tr><td>9</td><td>Households Economic Conditions and Disparities</td></td></tr><tr><td>10</td><td>Health statistics</td></td></tr><tr><td>11</td><td>Social Security and Welfare</td></td></tr><tr><td>12</td><td>Education and training</td></td></tr><tr><td>13</td><td>Communication, culture and leisure</td></td></tr><tr><td>14</td><td>Justice and Security</td></td></tr><tr><td>15</td><td>Citizens' opinions and satisfaction with life</td></td></tr><tr><td>16</td><td>Social participation</td></td></tr><tr><td>17</td><td>National Accounts</td></td></tr><tr><td>19</td><td>Agriculture</td></td></tr><tr><td>20</td><td>Industry and Construction</td></td></tr><tr><td>21</td><td>Services</td></td></tr><tr><td>22</td><td>Public Administrations and Private Institutions</td></td></tr><tr><td>24</td><td>External Trade and Internationalisation</td></td></tr><tr><td>25</td><td>Prices</td></td></tr><tr><td>26</td><td>Labour</td></td></tr></table>



Following code list all datasets contained into area ``Prices``.

.. code:: python

    istat_area_prices = istat.area('Prices')
    istat_area_prices.datasets()




.. raw:: html

    <table><tr><th>cod</th><th>name</th><th>dim</th></tr><tr><td>DCSC_FABBRESID_1</td><td>Construction costs index - monthly data</td><td>5</td></td></tr><tr><td>DCSC_PREZPRODSERV_1</td><td>Services producer prices index</td><td>5</td></td></tr><tr><td>DCSC_PREZZPIND_1</td><td>Producer price index for industrial products - monthly data</td><td>6</td></td></tr><tr><td>DCSP_FOI1</td><td>FOI  Monthly data until 2010</td><td>5</td></td></tr><tr><td>DCSP_FOI1B2010</td><td>FOI - Monthly data from 2011 to 2015</td><td>5</td></td></tr><tr><td>DCSP_FOI1B2015</td><td>FOI - Monthly data from 2016 onwards</td><td>5</td></td></tr><tr><td>DCSP_FOI2</td><td>FOI  Annual average  until 2010</td><td>5</td></td></tr><tr><td>DCSP_FOI2B2010</td><td>FOI  Annual average from 2011  onwards</td><td>5</td></td></tr><tr><td>DCSP_FOI2B2015</td><td>FOI - Annual average from 2016 onwards</td><td>5</td></td></tr><tr><td>DCSP_FOI3</td><td>FOI  Weights until 2010</td><td>4</td></td></tr><tr><td>DCSP_FOI3B2010</td><td>FOI - Weights from 2011 to 2015</td><td>4</td></td></tr><tr><td>DCSP_FOI3B2015</td><td>FOI - Weights from 2016 onwards</td><td>4</td></td></tr><tr><td>DCSP_IPAB</td><td>House price index </td><td>5</td></td></tr><tr><td>DCSP_IPCA1</td><td>HICP - Monthly data from 2001 to 2015 (base 2005=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCA1B2015</td><td>HICP - Monthly data from 2001 onwards (base 2015=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCA2</td><td>HICP - Annual average from 2001 to 2015 (base 2005=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCA2B2015</td><td>HICP - Annual average from 2001 onwards (base 2015=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCA3</td><td>HICP  Weights from 2001 onwards</td><td>4</td></td></tr><tr><td>DCSP_IPCATC1</td><td>HICP at constant tax rates - Monthly data from 2002 to 2015 (base 2005=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCATC1B2015</td><td>HICP at constant tax rates - Monthly data from 2002 onwards (base 2015=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCATC2</td><td>HICP at constant tax rates - Annual average from 2002 to 2015 (base 2005=100)</td><td>5</td></td></tr><tr><td>DCSP_IPCATC2B2015</td><td>HICP at constant tax rates - Annual average from 2002 onwards (base 2015=100)</td><td>5</td></td></tr><tr><td>DCSP_NIC1B2015</td><td>NIC - Monthly data from 2016 onwards</td><td>5</td></td></tr><tr><td>DCSP_NIC3B2015</td><td>NIC - Weights from 2016 onwards</td><td>4</td></td></tr><tr><td>DCSP_NICDUE</td><td>NIC  Annual average until 2010</td><td>5</td></td></tr><tr><td>DCSP_NICDUEB2010</td><td>NIC  Annual average from 2011 onwards</td><td>5</td></td></tr><tr><td>DCSP_NICTRE</td><td>NIC  Weights  until 2010</td><td>4</td></td></tr><tr><td>DCSP_NICTREB2010</td><td>NIC - Weights from 2011 to 2015</td><td>4</td></td></tr><tr><td>DCSP_NICUNOB</td><td>NIC  Monthly data until 2010</td><td>5</td></td></tr><tr><td>DCSP_NICUNOBB2010</td><td>NIC - Monthly data from 2011 to 2015</td><td>5</td></td></tr></table>



List all dimension for dataset ``DCSP_IPAB`` (House price index)

.. code:: python

    istat_dataset_dcsp_ipab = istat_area_prices.dataset('DCSP_IPAB')
    istat_dataset_dcsp_ipab




.. raw:: html

    DCSP_IPAB(5):House price index </br><table><tr><th>nr</th><th>name</th><th>nr. values</th><th>values (first 3 values)</th></tr><tr><td>0</td><td>Territory</td><td>1</td><td>1:'Italy'</td></td></tr><tr><td>1</td><td>Index type</td><td>3</td><td>18:'house price index (base 2010=100) - quarterly data', 19:'house price index (base 2010=100) - annual average', 20:'house price index (base 2010=100) - weights' ...</td></td></tr><tr><td>2</td><td>Measure</td><td>5</td><td>8:'annual average rate of change', 4:'index number', 22:'not applicable' ...</td></td></tr><tr><td>3</td><td>Purchases of dwellings</td><td>3</td><td>4:'H1 - all items', 5:'H11 - new dwellings', 6:'H12 - existing dwellings' ...</td></td></tr><tr><td>4</td><td>Time and frequency</td><td>29</td><td>2112:'Q1-2011', 2178:'Q3-2014', 2116:'Q2-2011' ...</td></td></tr></table>



Finally from istat dataset we extracts data in jsonstat format by
specifying dimensions we are interested.

.. code:: python

    spec = { 
        "Territory": 1, "Index type": 18, 
        # "Measure": 0, # "Purchases of dwelling": 0, # "Time and frequency": 0
    }
    # convert istat dataset into jsonstat collection and print some info
    collection = istat_dataset_dcsp_ipab.getvalues(spec)
    collection




.. raw:: html

    JsonstatCollection contains the following JsonStatDataSet:</br><table><tr><td>pos</td><td>dataset</td></tr><tr><td>0</td><td>'IDMISURA1*IDTYPPURCH*IDTIME'</td></tr></table>



The previous call is equivalent to call istat api with a "1,18,0,0,0"
string of number. Below is the mapping from the number and dimensions:

+------------------------+------+-------------------------------------------------------+
| dimension              |      |                                                       |
+========================+======+=======================================================+
| Territory              | 1    | Italy                                                 |
+------------------------+------+-------------------------------------------------------+
| Type                   | 18   | house price index (base 2010=100) - quarterly data'   |
+------------------------+------+-------------------------------------------------------+
| Measure                | 0    | ALL                                                   |
+------------------------+------+-------------------------------------------------------+
| Purchase of dwelling   | 0    | ALL                                                   |
+------------------------+------+-------------------------------------------------------+
| Time and frequency     | 0    | ALL                                                   |
+------------------------+------+-------------------------------------------------------+

.. code:: python

    json_stat_data = istat_dataset_dcsp_ipab.getvalues("1,18,0,0,0")
    json_stat_data




.. raw:: html

    JsonstatCollection contains the following JsonStatDataSet:</br><table><tr><td>pos</td><td>dataset</td></tr><tr><td>0</td><td>'IDMISURA1*IDTYPPURCH*IDTIME'</td></tr></table>



step2: using jsonstat.py api.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now we have a jsonstat collection, let expore it with the api of
jsonstat.py

Print some info of one dataset contained into the above jsonstat
collection

.. code:: python

    jsonstat_dataset = collection.dataset('IDMISURA1*IDTYPPURCH*IDTIME')
    jsonstat_dataset




.. raw:: html

    name:   'IDMISURA1*IDTYPPURCH*IDTIME'</br>label:  'House price index  by Measure, Purchases of dwellings and Time and frequency - Italy - house price index (base 2010=100) - quarterly data'</br>size: 207</br><table><tr><td>pos</td><td>id</td><td>label</td><td>size</td><td>role</td></tr><tr><td>0</td><td>IDMISURA1</td><td>Measure</td><td>3</td><td></td></tr><tr><td>1</td><td>IDTYPPURCH</td><td>Purchases of dwellings</td><td>3</td><td></td></tr><tr><td>2</td><td>IDTIME</td><td>Time and frequency</td><td>23</td><td></td></tr></table>



Print info about the dimensions to get an idea about the data

.. code:: python

    jsonstat_dataset.dimension('IDMISURA1')




.. raw:: html

    <table><tr><td>pos</td><td>idx</td><td>label</td></tr><tr><td>0</td><td>'4'</td><td>'index number'</td></tr><tr><td>1</td><td>'6'</td><td>'percentage changes on the previous period'</td></tr><tr><td>2</td><td>'7'</td><td>'percentage changes on the same period of the previous year'</td></tr></table>



.. code:: python

    jsonstat_dataset.dimension('IDTYPPURCH')




.. raw:: html

    <table><tr><td>pos</td><td>idx</td><td>label</td></tr><tr><td>0</td><td>'4'</td><td>'H1 - all items'</td></tr><tr><td>1</td><td>'5'</td><td>'H11 - new dwellings'</td></tr><tr><td>2</td><td>'6'</td><td>'H12 - existing dwellings'</td></tr></table>



.. code:: python

    jsonstat_dataset.dimension('IDTIME')




.. raw:: html

    <table><tr><td>pos</td><td>idx</td><td>label</td></tr><tr><td>0</td><td>'2093'</td><td>'Q1-2010'</td></tr><tr><td>1</td><td>'2097'</td><td>'Q2-2010'</td></tr><tr><td>2</td><td>'2102'</td><td>'Q3-2010'</td></tr><tr><td>3</td><td>'2106'</td><td>'Q4-2010'</td></tr><td>...</td><td>...</td><td>...</td></table>



.. code:: python

    import pandas as pd
    df = jsonstat_dataset.to_table(rtype=pd.DataFrame)
    df.head()




.. raw:: html

    <div>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>Measure</th>
          <th>Purchases of dwellings</th>
          <th>Time and frequency</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>index number</td>
          <td>H1 - all items</td>
          <td>Q1-2010</td>
          <td>99.5</td>
        </tr>
        <tr>
          <th>1</th>
          <td>index number</td>
          <td>H1 - all items</td>
          <td>Q2-2010</td>
          <td>100.0</td>
        </tr>
        <tr>
          <th>2</th>
          <td>index number</td>
          <td>H1 - all items</td>
          <td>Q3-2010</td>
          <td>100.3</td>
        </tr>
        <tr>
          <th>3</th>
          <td>index number</td>
          <td>H1 - all items</td>
          <td>Q4-2010</td>
          <td>100.2</td>
        </tr>
        <tr>
          <th>4</th>
          <td>index number</td>
          <td>H1 - all items</td>
          <td>Q1-2011</td>
          <td>100.1</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: python

    filtered = df.loc[
        (df['Measure'] == 'index number') & (df['Purchases of dwellings'] == 'H1 - all items'), 
        ['Time and frequency', 'Value']
    ]
    filtered.set_index('Time and frequency')




.. raw:: html

    <div>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>Value</th>
        </tr>
        <tr>
          <th>Time and frequency</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Q1-2010</th>
          <td>99.5</td>
        </tr>
        <tr>
          <th>Q2-2010</th>
          <td>100.0</td>
        </tr>
        <tr>
          <th>Q3-2010</th>
          <td>100.3</td>
        </tr>
        <tr>
          <th>Q4-2010</th>
          <td>100.2</td>
        </tr>
        <tr>
          <th>Q1-2011</th>
          <td>100.1</td>
        </tr>
        <tr>
          <th>Q2-2011</th>
          <td>101.2</td>
        </tr>
        <tr>
          <th>Q3-2011</th>
          <td>101.2</td>
        </tr>
        <tr>
          <th>Q4-2011</th>
          <td>100.5</td>
        </tr>
        <tr>
          <th>Q1-2012</th>
          <td>99.9</td>
        </tr>
        <tr>
          <th>Q2-2012</th>
          <td>99.1</td>
        </tr>
        <tr>
          <th>Q3-2012</th>
          <td>97.4</td>
        </tr>
        <tr>
          <th>Q4-2012</th>
          <td>95.3</td>
        </tr>
        <tr>
          <th>Q1-2013</th>
          <td>93.9</td>
        </tr>
        <tr>
          <th>Q2-2013</th>
          <td>93.3</td>
        </tr>
        <tr>
          <th>Q3-2013</th>
          <td>91.9</td>
        </tr>
        <tr>
          <th>Q4-2013</th>
          <td>90.2</td>
        </tr>
        <tr>
          <th>Q1-2014</th>
          <td>89.3</td>
        </tr>
        <tr>
          <th>Q2-2014</th>
          <td>88.7</td>
        </tr>
        <tr>
          <th>Q3-2014</th>
          <td>88.3</td>
        </tr>
        <tr>
          <th>Q4-2014</th>
          <td>86.9</td>
        </tr>
        <tr>
          <th>Q1-2015</th>
          <td>86.1</td>
        </tr>
        <tr>
          <th>Q2-2015</th>
          <td>86.1</td>
        </tr>
        <tr>
          <th>Q3-2015</th>
          <td>86.3</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: python

    %matplotlib inline
    import matplotlib.pyplot as plt
    
    values = filtered['Value'].tolist()
    labels = filtered['Time and frequency']
    
    xs = [i + 0.1 for i, _ in enumerate(values)]
    # bars are by default width 0.8, so we'll add 0.1 to the left coordinates 
    # so that each bar is centered
    
    # plot bars with left x-coordinates [xs], heights [num_oscars]
    plt.figure(figsize=(15,4))
    plt.bar(xs, values)
    plt.ylabel("value")
    plt.title("house index")
    
    # label x-axis with movie names at bar centers
    plt.xticks([i + 0.5 for i, _ in enumerate(labels)], labels, rotation='vertical') 
    plt.show()



.. image:: istat_house_price_index_files/istat_house_price_index_25_0.png

