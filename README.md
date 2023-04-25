#### <i>Esri Services Enablement Workshop 2023​</i>
### Sam Matenaer · Niklas Köhn
# React and the ​ArcGIS Maps SDK for JavaScript​

## Group 1 Task

Update the code so the ``StatusCmp`` displays the center point of the map and updates as it changes when moving the map.

## Bonus Task
* The ``StatusCmp`` already uses another hook to display data out of its own store.. but it looks kinda sad. It's not updating! What can you do to actually update?
  
### Hints
* ``src/Map`` folder:
  * ``MapController`` is the class initializing WebMap and MapView. Look for the code block that ensures that MapView is initialized. Use JSSDK methods in it to watch for the right data and bring it into stage mgmt.
  * ``MapStore`` is the state mgmt class for your map. A class variable for the center point as well as a setter function have already been prepared for you. You don't need to change anything here, but use them wisely!
  * ``MapProvider`` and ``useMapContext`` are the context provider and hook to provide programmatic access to your map to other parts of your application. You don't need to touch these for this task.
* ``src/Status`` folder:
  * ``StatusCmp`` is the place to display your data. The ``useStores`` hook will give you access to the MapStore. 

--- 

### More hints (spoilers!!)
* Your center data goes into ``MapStore``. To do that, you need a class variable of type ``__esri.Point``. It needs to be marked as ``observable`` in the ``makeObservable`` section, so the consumer component re-renders when the values change. You should also add a setter function marked as ``action`` to stop Mobx from complaining that the state was changed directly.
* In ``StatusCmp``, get the ``mapStore`` via the ``useStores`` hook. There are already curly brackets to de-reference the ``statusStore`` from there. Just add ``mapStore`` here.
* Add some output for your center property down in the JSX section of ``StatusCmp``.
