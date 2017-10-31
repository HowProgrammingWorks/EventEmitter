module EventEmitter where

import Data.Map.Strict as M
import Data.Maybe

type EventEmitter a f = Map a [f]

on :: Ord a => a -> f  -> EventEmitter a f  -> EventEmitter a f
on name fn = alter (Just . maybe [fn] (fn:)) name

emit :: Ord a => a -> b -> EventEmitter a (b -> c) -> [c]
emit name dat = fmap ($ dat) . fromMaybe [] . M.lookup name

newEventEmitter :: EventEmitter a f
newEventEmitter = empty
