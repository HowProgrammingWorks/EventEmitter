module Main where

import EventEmitter

data Struct = Struct { a :: Int } deriving (Show)

application = newEventEmitter

main = mconcat . emit "smth" (Struct 5) . on "smth" print $ application
