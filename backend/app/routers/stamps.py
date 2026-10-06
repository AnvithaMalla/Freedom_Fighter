from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models.stamp import Stamp, StampTranslation
from app.schemas.stamp import StampResponse, StampTranslationResponse


router = APIRouter(
    prefix="/api/stamps",
    tags=["Stamps"],
)


@router.get("/", response_model=list[StampResponse])
def get_stamps(
    language: str = Query("en"),
    country: str | None = None,
    year: int | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    query = (
        select(Stamp)
        .options(
            selectinload(Stamp.country),
            selectinload(Stamp.translations),
        )
    )

    if country:
        query = query.join(Stamp.country).where(
            Stamp.country.has(country_name=country)
        )

    if year:
        query = query.where(
            Stamp.release_year == year
        )

    if search:
        query = query.where(
            Stamp.subject_name.ilike(f"%{search}%")
        )

    query = query.order_by(
        Stamp.release_year.desc(),
        Stamp.stamp_id.desc(),
    )

    stamps = db.scalars(query).unique().all()

    result = []

    for stamp in stamps:
        translation = next(
            (
                item
                for item in stamp.translations
                if item.language_code == language
            ),
            None,
        )

        # English fallback
        if translation is None:
            translation = next(
                (
                    item
                    for item in stamp.translations
                    if item.language_code == "en"
                ),
                None,
            )

        result.append(
            StampResponse(
                stamp_id=stamp.stamp_id,
                stamp_number=stamp.stamp_number,
                subject_name=stamp.subject_name,
                country_id=stamp.country_id,
                country_name=stamp.country.country_name,
                country_code=stamp.country.country_code,
                catalogue_number=stamp.catalogue_number,
                release_date=stamp.release_date,
                release_year=stamp.release_year,
                denomination=stamp.denomination,
                issue_type=stamp.issue_type,
                purpose_type=stamp.purpose_type,
                image_path=stamp.image_path,
                is_currently_valid=stamp.is_currently_valid,
                translation=(
                    StampTranslationResponse.model_validate(translation)
                    if translation
                    else None
                ),
            )
        )

    return result


@router.get("/{stamp_id}", response_model=StampResponse)
def get_stamp(
    stamp_id: int,
    language: str = Query("en"),
    db: Session = Depends(get_db),
):
    query = (
        select(Stamp)
        .options(
            selectinload(Stamp.country),
            selectinload(Stamp.translations),
        )
        .where(Stamp.stamp_id == stamp_id)
    )

    stamp = db.scalars(query).unique().first()

    if stamp is None:
        raise HTTPException(
            status_code=404,
            detail="Stamp not found",
        )

    translation = next(
        (
            item
            for item in stamp.translations
            if item.language_code == language
        ),
        None,
    )

    if translation is None:
        translation = next(
            (
                item
                for item in stamp.translations
                if item.language_code == "en"
            ),
            None,
        )

    return StampResponse(
        stamp_id=stamp.stamp_id,
        stamp_number=stamp.stamp_number,
        subject_name=stamp.subject_name,
        country_id=stamp.country_id,
        country_name=stamp.country.country_name,
        country_code=stamp.country.country_code,
        catalogue_number=stamp.catalogue_number,
        release_date=stamp.release_date,
        release_year=stamp.release_year,
        denomination=stamp.denomination,
        issue_type=stamp.issue_type,
        purpose_type=stamp.purpose_type,
        image_path=stamp.image_path,
        is_currently_valid=stamp.is_currently_valid,
        translation=(
            StampTranslationResponse.model_validate(translation)
            if translation
            else None
        ),
    )