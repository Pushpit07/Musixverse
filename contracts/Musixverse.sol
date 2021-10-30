// contracts/Musixverse.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Musixverse is ERC721 {
    using SafeMath for uint256;

    Song[] public songs;
    uint256 public songsCount = 0;
    mapping(string => bool) songExists;

    address MusixverseMain = 0x159507b2b3829791fAB794581D2aC074F3596013;

    constructor() ERC721("Musixverse", "MXV") {}

    struct Link {
        string spotify;
        string appleMusic;
        string amazonMusic;
        string youtubeMusic;
    }

    struct Characteristic {
        string genre;
        string[] instruments;
        string lyricsHash;
        string typeOfLyrics;
        string songType;
        string frequency;
        string instrumentType;
        bool sampleBased;
    }

    struct Sales {
        address[] previousOwners;
        uint256[] previousPrices;
    }

    struct Song {
        uint256 id;
        string songName;
        string artistName;
        uint256 price;
        string imgHash;
        string songHash;
        address payable artistAddress;
        address payable currentOwnerAddress;
        bool onSale;
        Sales sales;
        Link links;
        Characteristic characteristics;
    }

    event SongCreated(
        uint256 id,
        string songName,
        string artistName,
        uint256 price,
        string imgHash,
        string songHash,
        address payable artistAddress,
        address payable currentOwnerAddress,
        bool onSale,
        Sales sales,
        Link links,
        Characteristic characteristics
    );

    event SongPurchased(
        uint256 id,
        string songName,
        string artistName,
        uint256 price,
        string imgHash,
        string songHash,
        address payable artistAddress,
        address payable currentOwnerAddress,
        bool onSale,
        Sales sales,
        Link links,
        Characteristic characteristics
    );

    event SongUpdated(
        uint256 id,
        string songName,
        string artistName,
        uint256 price,
        address payable artistAddress,
        address payable currentOwnerAddress,
        bool onSale,
        Sales sales
    );

    event FundsTransferred(
        uint256 fundsTransferredToSeller,
        uint256 fundsTransferredToArtist
    );

    event FundsTransferredToArtist(uint256 fundsTransferredToArtist);

    function createSong(
        string memory _songName,
        string memory _artistName,
        uint256 _price,
        string memory _imgHash,
        string memory _songHash,
        bool _onSale,
        Link memory _links,
        Characteristic memory _characteristics
    ) public {
        // require unique name
        require(bytes(_songName).length > 0);
        require(_price > 0);
        require(bytes(_imgHash).length > 0);
        require(bytes(_songHash).length > 0);
        require(!songExists[_songName]);
        songsCount = songsCount + 1;

        Sales memory _sales;

        songs.push(
            Song(
                songsCount,
                _songName,
                _artistName,
                _price,
                _imgHash,
                _songHash,
                payable(msg.sender),
                payable(msg.sender),
                _onSale,
                _sales,
                _links,
                _characteristics
            )
        );

        // Song - add it
        uint256 _id = songs.length - 1;
        // Call mint function
        _mint(msg.sender, _id);
        // Song - track it
        songExists[_songName] = true;
        // Trigger an event
        emit SongCreated(
            songsCount,
            _songName,
            _artistName,
            _price,
            _imgHash,
            _songHash,
            payable(msg.sender),
            payable(msg.sender),
            _onSale,
            _sales,
            _links,
            _characteristics
        );
    }

    function purchaseSong(uint256 _id) public payable {
        // Fetch the song
        Song storage _song = songs[_id];
        // Make sure the song is valid
        require(_song.id > 0 && _song.id <= songsCount);
        // Require that there is enough ether in the transaction
        require(msg.value >= _song.price);
        // Require that the song is available for sale
        require(_song.onSale);
        // Require that buyer is not the seller
        require(_song.currentOwnerAddress != msg.sender);
        // Add the owner to previousOwners
        _song.sales.previousOwners.push(_song.currentOwnerAddress);
        // Add price to previousPrices
        _song.sales.previousPrices.push(_song.price);
        // Transfer ether
        if (_song.currentOwnerAddress == _song.artistAddress) {
            // Transfer all ether to artist whenever the first transaction for the NFT happens. This is because the artist is the owner after creating the NFT.
            payable(_song.currentOwnerAddress).transfer(msg.value);
            emit FundsTransferredToArtist(msg.value);
        } else {
            // Pay the seller by sending 94% ether
            uint256 _value = ((msg.value).mul(94)).div(100);
            payable(_song.currentOwnerAddress).transfer(_value);
            // Pay the artist 5% of the transaction amount as royalty
            uint256 _royalty = ((msg.value).mul(5)).div(100);
            payable(_song.artistAddress).transfer(_royalty);
            // Pay the platform fee by sending the remaining 1% ether
            uint256 _platformFee = ((msg.value).mul(1)).div(100);
            payable(MusixverseMain).transfer(_platformFee);
            // Trigger funds transferred event
            emit FundsTransferred(_value, _royalty);
        }
        // Transfer ownership to buyer
        _song.currentOwnerAddress = payable(msg.sender);
        // Increase price of NFT by 20%
        _song.price = ((_song.price).mul(120)).div(100);
        // Update the song
        songs[_id] = _song;
        // Trigger an event
        emit SongPurchased(
            songsCount,
            _song.songName,
            _song.artistName,
            _song.price,
            _song.imgHash,
            _song.songHash,
            _song.artistAddress,
            _song.currentOwnerAddress,
            _song.onSale,
            _song.sales,
            _song.links,
            _song.characteristics
        );
    }

    function toggleOnSale(uint256 _id) public {
        // Fetch the song
        Song storage _song = songs[_id];
        // Make sure the song is valid
        require(_song.id > 0 && _song.id <= songsCount);
        // Require that the current owner is calling the function
        require(_song.currentOwnerAddress == msg.sender);
        // Toggle onSale attribute
        if (_song.onSale == true) {
            _song.onSale = false;
        } else if (_song.onSale == false) {
            _song.onSale = true;
        }
        // Update the song
        songs[_id] = _song;
        // Trigger an event
        emit SongUpdated(
            songsCount,
            _song.songName,
            _song.artistName,
            _song.price,
            _song.artistAddress,
            _song.currentOwnerAddress,
            _song.onSale,
            _song.sales
        );
    }

    function updatePrice(uint256 _id, uint256 _newPrice) public {
        // Fetch the song
        Song storage _song = songs[_id];
        // Make sure the song is valid
        require(_song.id > 0 && _song.id <= songsCount);
        // Require that the current owner is calling the function
        require(_song.currentOwnerAddress == msg.sender);
        // Edit the price
        _song.price = _newPrice;
        // Update the song
        songs[_id] = _song;
        // Trigger an event
        emit SongUpdated(
            songsCount,
            _song.songName,
            _song.artistName,
            _song.price,
            _song.artistAddress,
            _song.currentOwnerAddress,
            _song.onSale,
            _song.sales
        );
    }
}
