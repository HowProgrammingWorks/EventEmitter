module EnhancedEmitter where

import Data.Map.Strict as M
import Control.Monad (when)
import EventEmitter as EE

on :: Ord a => a -> f -> EventEmitter a (b -> f) -> EventEmitter a (b -> f)
on name fn = EE.on name $ const fn

onAny :: f -> EventEmitter String f -> EventEmitter String f
onAny fn = EE.on "*" fn

emit :: String -> b -> EventEmitter String (String -> b -> c) -> [c]
emit name dat ee = ($ dat) <$> named ++ any
  where named = if name /= "*" then  EE.emit name name ee else []
        any   = EE.emit "*" name ee

emitter = EE.newEventEmitter
